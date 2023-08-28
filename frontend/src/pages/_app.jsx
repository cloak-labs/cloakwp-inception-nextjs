import '@/styles/globals.css'
import 'focus-visible'
import Head from 'next/head'
import parse from 'html-react-parser';
import { BlockConfigProvider, ErrorPage, GlobalsProvider } from 'cloakwp'
import myBlockConfig from '@/config/myBlockConfig'
import { Layout } from '@/components/Layout'

export default function App({ Component, pageProps }) {
  const {
    enableLayout = true,
    pageData,
    navBarData = {},
    options = {},
    isPreview = false,
    previewParams
  } = pageProps
  const { yoast_head } = pageData || {}

  return (
    <GlobalsProvider
      options={options}
      navBarData={navBarData}
      pageData={pageData}
      isPreview={isPreview}
      previewParams={previewParams}
    >
      {pageData?.data?.status == 403 ? (
        <Layout>
          <ErrorPage errorData={pageData} />
        </Layout>
      ) : (
        <BlockConfigProvider blocks={myBlockConfig}>
          {yoast_head &&
            <Head>
              {parse(yoast_head)}
            </Head>
          }
          {enableLayout ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </BlockConfigProvider>
      )}
    </GlobalsProvider>
  )
}