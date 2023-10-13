import { useBlockStyleBuilder } from 'cloakwp';
import { CardsGrid } from '../Cards/CardsGrid';
import PostCard from '../Cards/PostCard';

export function PostsBlock({ block }) {
  const { styles } = useBlockStyleBuilder(block);
  const { data, attrs } = block;

  if (data.post_type == 'Testimonial') {
    return <>TODO: Testimonial Block</>;
  }

  const cards = data.posts.map((post) => ({
    ...post,
    imageUrl: post.image.medium,
    description: post.excerpt,
  }));

  return (
    <CardsGrid
      cols={3}
      cta={data.cta_text}
      cards={cards}
      cardComponent={PostCard}
      cardProps={{
        postMeta: data.post_meta,
      }}
      limit={data.posts?.length}
      bgColor={attrs.backgroundColor}
      style={styles}
    />
  );
}
