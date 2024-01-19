import { type PreviewModeParams, type WPClient, getPreviewData } from 'cloakwp';
import {
  type GetStaticPropsContext,
  type GetStaticPropsResult,
  type PreviewData,
} from 'next';
import { wp } from '@/lib/utils/wp';
import { type ParsedUrlQuery } from 'querystring';

// 1. Define the standard page props we return from getStaticProps.. you may want to better define these types:
export type StandardPageProps = {
  pageData: Record<string, any>;
  headerMenuData?: Record<string, any>;
  options?: Record<string, any>;
  isPreview?: boolean;
};

// 2. Define the standard URL params that are accesible from the getStaticProps context.params object:
export type StandardPageParams = ParsedUrlQuery & {
  slug: string; // this assumes we name dynamic routes using the "slug" keyword
};

// 3. Define our enhanced version of `getStaticProps`:
export type EnhancedGetStaticProps<
  Props extends { [key: string]: any } = StandardPageProps,
  Params extends ParsedUrlQuery = StandardPageParams,
  Preview extends PreviewData = PreviewModeParams
> = (props: {
  ctx: GetStaticPropsContext<Params, Preview>;
  wpClient: WPClient;
}) => Promise<GetStaticPropsResult<Props>> | GetStaticPropsResult<Props>;

/**
 * withPageDefaults wraps instances of `getStaticProps` to take care of handling global
 * sitewide things that you shouldn't have to repeat for every page/template -- things
 * like fetching the header menu, ACF Options data, defining a default revalidate time,
 * handling 404 page-not-found errors,
 */
export const withPageDefaults = (getStaticProps?: EnhancedGetStaticProps) => {
  return async (
    ctx: GetStaticPropsContext<StandardPageParams, PreviewModeParams>
  ) => {
    const { preview, previewData } = ctx;
    const wpClient = wp.client() as WPClient;

    // call the provided getStaticProps function, passing the wpClient just to be extra helpful:
    let result = getStaticProps
      ? await getStaticProps({ ctx, wpClient })
      : null;

    if (result && 'redirect' in result) {
      // return the getStaticProps result early since it's a redirect
      return result;
    }

    let pageData = null;
    if (result && 'props' in result) {
      // handle overriding page data with preview data (latest unpublished revision) if we're in preview mode:
      pageData = preview
        ? await getPreviewData(previewData, wpClient)
        : result.props.pageData;

      if (!pageData) {
        // redirect to 404 page because page doesn't exist:
        return {
          notFound: true,
        };
      }
    }

    // merge global stuff like header & ACF options data into the page-specific props:
    return {
      revalidate: 10,
      ...result,
      props: {
        headerMenuData: await wpClient.menus().id('header-nav').get(),
        options: await wpClient.options().get(),
        ...(result && 'props' in result ? result.props : {}), // we merge this here to allow overriding `headerMenuData` & `options` but not others
        isPreview: preview ?? false,
        pageData,
      },
    };
  };
};
