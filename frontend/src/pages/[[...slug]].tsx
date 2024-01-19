import DynamicBlocksPage from '@/components/Layout/DynamicBlocksPage';
import { wp } from '@/lib/utils/wp';
import { withPageDefaults } from '@/lib/utils/withPageDefaults';
import { PAGE_FIELDS } from '@/lib/config/wp-query-field-subsets';

export default DynamicBlocksPage;

export const getStaticProps = withPageDefaults(async ({ ctx, wpClient }) => {
  const { slug } = ctx.params;

  return {
    props: {
      pageData: slug
        ? await wpClient.pages().slug(slug).fields(PAGE_FIELDS).get()
        : await wpClient.frontpage().fields(PAGE_FIELDS).get(),
    },
  };
});

export async function getStaticPaths() {
  const pages = await wp.client().pages().fields('slug').get();

  return {
    paths: pages.map(({ slug }) => ({ params: { slug: [slug] } })),
    fallback: 'blocking', // ensures that when a new post is created in WP, it server-side renders the 1st time a user visits, then it's statically served moving forward
  };
}
