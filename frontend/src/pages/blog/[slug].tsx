import { PostGrid } from '@/components/Cards';
import { TypographyH2 } from '@cloakui/react-primitives';
import { stripHtml } from '@cloakui/utils';
import { wp } from '@/lib/utils/wp';
import { withPageDefaults } from '@/lib/utils/withPageDefaults';
import { container } from '@/lib/styles/container';
import {
  POST_FIELDS,
  POST_CARD_FIELDS,
} from '@/lib/config/wp-query-field-subsets';
import { singlePostBlockConfig } from '@/lib/config/singlePostBlockConfig';
import { HeroSinglePost } from '@/components/Hero/HeroSinglePost';

const NUM_RECENT_POSTS = 3;

export default function BlogSinglePost({ pageData, recentPosts }) {
  const { blocks_data, date, title, author, featured_image } = pageData ?? {};

  const blocks = wp.blockRenderer
    .mergeConfigWith(singlePostBlockConfig)
    .render(blocks_data);

  return (
    <>
      <HeroSinglePost
        date={date}
        h1={title}
        author={{
          name: author?.display_name,
          detail: `@${author?.meta?.twitter}`,
          image: {
            src: author?.acf?.headshot?.sizes?.thumbnail,
            alt: author?.acf?.headshot?.alt,
          },
        }}
        image={{
          src: featured_image.large,
          alt: featured_image.alt,
        }}
      />
      <section className="relative overflow-hidden pb-14 pt-10 md:pb-24 md:pt-16">
        {blocks}
      </section>
      <section className="border-t bg-root-dim pb-24 pt-12">
        <div className={container({ width: 'wide' })}>
          <TypographyH2 className="mb-5">Recent Posts</TypographyH2>
          <PostGrid
            posts={recentPosts?.map(
              ({ pathname, featured_image, excerpt, ...rest }) => ({
                ...rest,
                href: pathname,
                image: { src: featured_image.medium, alt: featured_image.alt },
                description: stripHtml(excerpt),
                postMeta: ['date', 'author.display_name'],
                cta: 'Read more',
              })
            )}
            // cardProps={{
            //   postMeta: ['date', 'author.display_name'],
            // }}
            // cta="Read more"
            // limit={NUM_RECENT_POSTS}
          />
        </div>
      </section>
    </>
  );
}

export const getStaticProps = withPageDefaults(async ({ ctx, wpClient }) => {
  const pageData = await wpClient
    .posts()
    .slug(ctx.params.slug)
    .fields(POST_FIELDS)
    .get();

  return {
    props: {
      pageData,
      recentPosts: await wpClient
        .posts()
        .exclude(pageData.id)
        .perPage(NUM_RECENT_POSTS)
        .fields(POST_CARD_FIELDS)
        .get(),
    },
  };
});

// Statically generate all blog posts at build time:
export async function getStaticPaths() {
  const posts = await wp.client().posts().fields('slug').get();

  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking', // ensures that when new posts get created in WP, they get server-side rendered the first time a user tries to visit them, and then statically served from there on out
  };
}
