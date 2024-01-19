import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
} from 'next/font/google';

/**
 * Here is where we define our site's custom fonts, using the wonderful
 * `next/font` package for automatic font optimization.
 *
 * Learn more: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
 */

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});
