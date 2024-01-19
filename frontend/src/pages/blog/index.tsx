import DynamicBlocksPage from '@/components/Layout/DynamicBlocksPage';
import { PAGE_FIELDS } from '@/lib/config/wp-query-field-subsets';
import { withPageDefaults } from '@/lib/utils/withPageDefaults';

export default DynamicBlocksPage;

export const getStaticProps = withPageDefaults(async ({ wpClient }) => {
  return {
    props: {
      pageData: await wpClient.pages().slug('blog').fields(PAGE_FIELDS).get(),
    },
  };
});
