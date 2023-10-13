import { BlocksPage, getPreviewData, getWpInstance } from 'cloakwp';

export default BlocksPage;

export async function getStaticProps(ctx) {
  const wp = getWpInstance().serverApi();

  const { slug } = ctx.params;

  const pageData = ctx.preview
    ? await getPreviewData(ctx.previewData, wp)
    : slug
    ? await wp.pages().slug(slug).get()
    : await wp.frontpage();

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

export async function getStaticPaths() {
  const wp = getWpInstance().serverApi();

  const pages = await wp.pages().fields('slug').get();
  const paths = pages.map(({ slug }) =>
    // [slug]
    ({
      params: { slug: [slug] },
      // params: { slug },
    })
  );

  return {
    paths: paths,
    fallback: 'blocking', // ensures that when new posts get created in WP, they get server-side rendered the first time a user tries to visit them (and then they get statically served from there on out)
  };
}
