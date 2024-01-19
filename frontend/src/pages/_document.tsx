import { Head, Html, Main, NextScript } from 'next/document';
import { fontSans, fontMono } from '@/lib/utils/fonts';
import { cx } from '@/lib/utils/cva';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        className={cx(
          'h-full font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
