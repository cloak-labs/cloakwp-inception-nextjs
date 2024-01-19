import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405);
    res.end();
    return;
  }

  const { formName, gReCaptchaToken, formData } = req.body;

  if (!formData) {
    return res
      .status(400)
      .json({
        message: 'The form data is empty -- nothing to submit.',
        error: 400,
      });
  }

  const Mailjet = require('node-mailjet');

  const mailjet = new Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC, // TODO: set these env vars after creating free MailJet account
    process.env.MJ_APIKEY_PRIVATE,
    {
      config: {},
      options: {},
    }
  );

  // Try to extract contact's name based on multiple common ways of accepting name via form (falling back to "Unknown"):
  const { name, full_name, first_name, last_name } = formData;
  const contactName =
    name ?? full_name ?? (first_name && last_name)
      ? `${first_name} ${last_name}`
      : first_name ?? 'Unknown';

  const buildEmailContents = (formData: Record<string, any>) => {
    let TextPart = '';
    let HTMLPart = '';

    const snakeCaseToHumanReadable = (snakeCaseStr: string): string =>
      snakeCaseStr
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    Object.keys(formData).forEach((key) => {
      const label = snakeCaseToHumanReadable(key);
      TextPart += `${label}: ${formData[key]},\r\n`;
      HTMLPart += `<span>${label}: ${formData[key]}</span><br>\n`;
    });

    return { TextPart, HTMLPart };
  };

  const { TextPart, HTMLPart } = buildEmailContents(formData);

  // create the email delivery request to Mailjet (we don't send it off just yet)
  const mailjetRequest = mailjet.post('send', { version: 'v3.1' }).request(
    JSON.stringify({
      Messages: [
        {
          From: {
            Email: process.env.MJ_SEND_FROM_ADDRESS,
            Name: formName || 'Contact Request',
          },
          To: [
            {
              Email: process.env.MJ_SEND_TO_ADDRESS,
              Name: process.env.MJ_SEND_TO_NAME,
            },
          ],
          Subject: `Request from ${contactName}`,
          TextPart,
          HTMLPart,
        },
      ],
    })
  );

  // Run Google Recaptcha and only send Mailjet Request if it passes:
  try {
    fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${gReCaptchaToken}`,
    })
      .then((reCaptchaRes) => reCaptchaRes.json())
      .then((reCaptchaRes) => {
        console.log(
          reCaptchaRes,
          'Response from Google reCaptcha verification API'
        );
        if (reCaptchaRes?.score > 0.5) {
          // Passed recaptcha tests, now send Mailjet request:
          mailjetRequest
            .then((result) => {
              res.status(200).json({
                status: 'success',
                message: 'Submitted successfully',
              });
            })
            .catch((err) => {
              return res.status(500).json({
                status: 'failure',
                message: 'Failed to submit, please try again.',
              });
            });
        } else {
          res.status(200).json({
            status: 'failure',
            message: 'Google ReCaptcha Failure',
          });
        }
      });
  } catch (err) {
    res.status(405).json({
      status: 'failure',
      message: `Error submitting the form: ${err}`,
    });
  }
}
