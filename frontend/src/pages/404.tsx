import Head from 'next/head';
import { useGlobals } from '@cloakwp/react';
import { Container } from '@cloakui/react-primitives';
import { withPageDefaults } from '@/lib/utils/withPageDefaults';

export default function Custom404() {
  const { options } = useGlobals();

  return (
    <>
      <Head>
        <title>404 Page Not Found | {options?.company_name}</title>
      </Head>
      <section className="relative overflow-hidden">
        <Container>
          <div className="relative z-10 mx-auto flex h-[70vh] max-w-none flex-col items-center justify-center gap-y-4 sm:max-w-xl lg:max-w-3xl">
            <div className="mx-auto mb-24 max-w-md rounded-xl bg-root/10 p-6 backdrop-blur-sm xl:max-w-lg">
              <h4 className="uppercase text-link sm:text-xl">404 error</h4>
              <h1 className="mt-4 text-4xl font-semibold text-root sm:text-5xl">
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

export const getStaticProps = withPageDefaults();
