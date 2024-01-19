import { BlockPreview } from '@cloakwp/react';
import { useAbortRouteChanges } from '@cloakwp/nextjs';
import { deepMerge } from 'cloakwp';
import Head from 'next/head';
import micromatch from 'micromatch';
import { singlePostBlockConfig } from '@/lib/config/singlePostBlockConfig';

/**
 * `blockConfigOverrides` solves the following problem:
 *
 * When we render the block below in the <BlockPreviewPage />, we only have access to the root/global
 * BlockRendererConfig, and are potentially missing route-specific BlockRendererConfig overrides; this
 * can result in a block preview showing something completely wrong. So to fix this, we import any nested
 * BlockRendererConfigs used throughout the site, and match them to URL paths via glob patterns; in WP's
 * block editor, our block preview iframes will pass along the current post's pathname via a URL parameter,
 * so we can assign the correct BlockRendererConfig overrides to the BlockRenderer used for this route.
 */
const blockConfigOverrides = [
  {
    paths: ['/blog/*'],
    config: singlePostBlockConfig,
  },
];

export default function BlockPreviewPage({ blockData, pathname }) {
  // turn off Next.js Links during preview mode:
  useAbortRouteChanges(
    'Aborting route change while previewing block by purposely throwing an Error (not a real error, only happens while editing).'
  );

  let blockConfig = {};

  blockConfigOverrides.forEach(({ config, paths }) => {
    if (!Array.isArray(paths)) paths = [paths];

    // check if the current BlockConfig override should be used based on the post's pathname:
    const match = paths.some((path) => micromatch.isMatch(pathname, path));

    // if it's a match, merge the BlockConfig override with any previously matched overrides:
    if (match) blockConfig = deepMerge(blockConfig, config);
  });

  return (
    <>
      <Head>
        <title>{`Preview Block: ${blockData?.name ?? 'unknown'}`}</title>
      </Head>
      <BlockPreview data={blockData ?? {}} config={blockConfig} />
    </>
  );
}

export function getServerSideProps(ctx) {
  const { blockData, secret, pathname } = ctx.query;

  if (secret != process.env.CLOAKWP_AUTH_SECRET) {
    // if someone visits this route without passing the correct secret, we redirect them to the homepage
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      blockData: blockData ? JSON.parse(blockData) : null,
      pathname,
      enableLayout: false,
    },
  };
}
