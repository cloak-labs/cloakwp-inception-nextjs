import Head from 'next/head';
import { Container } from '@/components/Layout';
import { getWpInstance, useGlobals } from 'cloakwp';

export default function Custom404() {
  const { options } = useGlobals();

  return (
    <>
      <Head>
        <title>404 Not Found | {options.company_name}</title>
      </Head>
      <section className="relative overflow-hidden">
        <Container>
          <div className="relative z-10 mx-auto flex h-[70vh] max-w-none flex-col items-center justify-center gap-y-4 sm:max-w-xl lg:max-w-3xl">
            <div className="mx-auto mb-24 max-w-md rounded-xl bg-white/10 p-6 backdrop-blur-sm xl:max-w-lg">
              <h2 className="mt-4 font-sans text-lg text-blue-900 sm:text-xl">
                404 error
              </h2>
              <h1 className="mt-4 text-4xl text-blue-900 sm:text-5xl">
                Page not found...
              </h1>
              <p className="mt-6">
                Sorry, the page you are looking for doesn&apos;t exist or has
                been moved.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const wp = getWpInstance().serverApi();

  return {
    props: {
      navBarData: await wp.menus().id('header-nav').get(),
      options: await wp.options().get(),
    },
    revalidate: 200,
  };
}
