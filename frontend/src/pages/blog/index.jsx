import { BlocksPage, getPreviewData, getWpInstance } from 'cloakwp';

export default BlocksPage;

export async function getStaticProps(ctx) {
  const wp = getWpInstance().serverApi();

  const pageData = ctx.preview
    ? await getPreviewData(ctx.previewData, wp)
    : await wp.pages().slug('blog').get();

  return {
    props: {
      pageData: pageData,
      navBarData: await wp.menus().id('header-nav').get(),
      options: await wp.options().get(),
      isPreview: ctx.preview ?? false,
    },
    notFound: !pageData,
    revalidate: 10,
  };
}
