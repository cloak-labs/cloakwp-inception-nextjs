import type { HttpUrl, HttpsUrl } from 'cloakwp';

/**
 * getSiteUrl is a helper that returns the current front-end "base" URL for Next.js.
 *
 * * Note: this assumes we're hosting this Next.js site on Vercel.
 * You must manually set the environment variable `NEXT_PUBLIC_SITE_URL` within Vercel's
 * dashboard to your production URL, for your production environment ONLY; we fall back to
 * the magic, auto-populated env var `NEXT_PUBLIC_VERCEL_URL`, which ensures we retrieve the
 * correct URL for Vercel preview/dev deployments (not best practice to rely on this for
 * production, which is why we manually specify `NEXT_PUBLIC_SITE_URL`).
 */
export const getSiteUrl = (): HttpUrl | HttpsUrl => {
  const url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set to your production URL in Vercel's production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel (unique deployment URL).
    'http://localhost:5000/';

  let typedUrl: HttpUrl | HttpsUrl;
  if (url.startsWith('https://')) typedUrl = url as HttpsUrl;
  else if (url.startsWith('http://')) typedUrl = url as HttpUrl;
  else typedUrl = `https://${url}` as HttpsUrl;

  return typedUrl;
};
