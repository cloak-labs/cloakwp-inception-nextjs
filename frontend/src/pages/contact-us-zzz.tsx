import { withPageDefaults } from '@/lib/utils/withPageDefaults';
import { PAGE_FIELDS } from '@/lib/config/wp-query-field-subsets';
import { container } from '@/lib/styles/container';
import { ContactForm } from '@/components/Forms/ContactForm';
import { cx } from '@/lib/utils/cva';

export default function ContactPage({}) {
  return (
    <div className={cx('p-16', container())}>
      <ContactForm />
    </div>
  );
}

export const getStaticProps = withPageDefaults(async ({ wpClient }) => {
  return {
    props: {
      pageData: await wpClient
        .pages()
        .slug('contact-us')
        .fields(PAGE_FIELDS)
        .get(),
    },
  };
});
