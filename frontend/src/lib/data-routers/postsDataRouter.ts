import type { PostCardProps, PostGridProps } from '@/components/Cards';
import type { WPDataRouterReact } from '@cloakwp/react';
import { wpBlockStyleBuilder } from 'cloakwp';
import { cx } from '@/lib/utils/cva';

export const postsDataRouter: WPDataRouterReact<PostGridProps> = (
  block
): PostGridProps => {
  const { classes, styles } = wpBlockStyleBuilder(block);
  const { data: { posts, cta_text, post_meta } = {} } = block;

  const cardsData = posts?.map(
    ({ image, ...post }) =>
      ({
        ...post,
        image: { src: image?.medium, alt: image?.alt },
        postMeta: post,
        visiblePostMeta: post_meta,
        // description: stripHtml(post.excerpt), // optionally display post excerpts on cards like so
      } as PostCardProps)
  );

  return {
    cta: cta_text,
    posts: cardsData,
    className: cx(classes, 'justify-center'),
    style: styles,
  };
};
