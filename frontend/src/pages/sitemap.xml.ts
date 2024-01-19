import { wp } from '@/lib/utils/wp';
import { getSiteUrl } from '@/lib/utils/getSiteUrl';
import { type SitemapRouteObject, generateSitemap } from 'cloakwp';
import { type GetServerSidePropsContext } from 'next';

export default function Sitemap() {
  return null;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const client = wp.client();

  // Fetch all pathnames + modified dates for dynamic pages/routes from WP:
  const pageRoutes = await client.pages().fields('pathname,modified').get();
  const postRoutes = await client.posts().fields('pathname,modified').get();

  /**
   * If you have any non-WP-generated (i.e. hard-coded) pages in Next, manually merge
   * them into `allRoutes` here (an object with the page's full pathname + modified date):
   */
  const allRoutes: SitemapRouteObject[] = [...pageRoutes, ...postRoutes];

  // Setup + send XML sitemap response:
  ctx.res.setHeader('Content-Type', 'text/xml');
  ctx.res.setHeader('Cache-Control', 'public, max-age=604800');
  ctx.res.write(
    generateSitemap(allRoutes, {
      siteUrl: getSiteUrl(),
    })
  );
  ctx.res.end();

  return {
    props: {},
  };
}
