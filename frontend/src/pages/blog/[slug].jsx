import parse from 'html-react-parser';
import stripHtml from '@/utils/stripHtml';
import { Blocks, getWpInstance } from 'cloakwp';
import { Hero } from '@/components/Hero';
import { Container } from '@/components/Layout';

export default function BlogSinglePost({ pageData }) {
  console.log('post data: ', pageData);
  return (
    <>
      <Hero
        data={{
          hero_style: 'no_image',
          backgroundColor: 'gray-100',
          content_alignment: 'center',
          eyebrow: 'THE BLOG',
          h1: pageData?.title,
          subtitle: parse(stripHtml(pageData?.excerpt)),
        }}
      />
      <section className="relative overflow-hidden pb-14 pt-10 md:pb-24 md:pt-16">
        <Blocks
          data={pageData?.blocks_data}
          container={({ children }) => (
            <Container
              className="relative"
              innerClassName="max-w-3xl lg:max-w-4xl"
            >
              {children}
            </Container>
          )}
          blocks={{
            'core/image': {
              props: {
                className: 'mb-5',
              },
            },
            'acf/cardsgrid': {
              container: ({ children }) => (
                <Container
                  className="relative"
                  innerClassName="max-w-5xl lg:max-w-6xl"
                >
                  {children}
                </Container>
              ),
            },
          }}
        />
      </section>
    </>
  );
}

export async function getStaticProps(ctx) {
  const wp = getWpInstance().serverApi();

  const pageData = ctx.preview
    ? await getPreviewData(ctx.previewData, wp)
    : await wp.posts().slug(ctx.params.slug).get();

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

  const posts = await wp.posts().fields('slug').get();
  const paths = posts.map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths: paths,
    fallback: 'blocking', // ensures that when new posts get created in WP, they get server-side rendered the first time a user tries to visit them (and then they get statically served from there on out)
  };
}
