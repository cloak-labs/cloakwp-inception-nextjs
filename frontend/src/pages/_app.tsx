import '@/lib/config/cloakwp.config';
import '@/lib/styles/globals.css';
import 'focus-visible';
import Head from 'next/head';
import parse from 'html-react-parser';
import { ErrorPage, GlobalsProvider } from '@cloakwp/react';
import { Layout } from '@/components/Layout';
import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import { fontSans, fontMono } from '@/lib/utils/fonts';
import { cx } from '@/lib/utils/cva';

export default function App({ Component, pageProps }) {
  const {
    enableLayout = true,
    pageData,
    headerMenuData = {},
    options = {},
    isPreview = false,
  } = pageProps;
  const { yoast_head } = pageData || {};

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <GlobalsProvider
        options={options}
        headerMenuData={headerMenuData}
        pageData={pageData}
        isPreview={isPreview}
      >
        {pageData?.data?.status == 403 ? (
          <Layout>
            <Head>
              <title>Error</title>
            </Head>
            <ErrorPage errorData={pageData} />
          </Layout>
        ) : (
          <>
            {yoast_head && <Head>{parse(yoast_head)}</Head>}
            {enableLayout ? (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            ) : (
              <main
                className={cx(
                  'font-sans antialiased',
                  fontSans.variable,
                  fontMono.variable
                )}
              >
                <Component {...pageProps} />
              </main>
            )}
          </>
        )}
      </GlobalsProvider>
    </ThemeProvider>
  );
}
