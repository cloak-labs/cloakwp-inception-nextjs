import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

/** Wrap any form component with CaptchaProvider to secure it with Google reCaptcha v3 */
export const CaptchaProvider = ({ children }) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
      useEnterprise={true}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};
