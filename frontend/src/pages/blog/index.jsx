import { Blocks } from 'cloakwp';

export default function BlogArchive({ pageData }) {
  return <Blocks data={pageData?.blocksData} />
}

export async function getStaticProps(context) {
  const { getPreviewData, getPage, getMenus, getACFOptions } = await import('cloakwp');
  let { data } = await getPage({ slug: 'blog' }); // manually pass in slug because context.params.page != '/blog' because it's an index file
  const navBarData = await getMenus('header-nav');
  const options = await getACFOptions();

  let preview = {};
  const { preview: isPreview, previewData } = context
  
  if (isPreview) {
    preview = await getPreviewData(previewData);
    data = preview.data;
  }

  return {
    props: {
      pageData: data,
      navBarData: navBarData,
      options: options,
      preview: context.preview ?? false,
      previewParams: preview.params ?? null,
    },
    revalidate: 10,
  };
}
