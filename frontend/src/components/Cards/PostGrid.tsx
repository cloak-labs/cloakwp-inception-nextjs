import React from 'react';
import { PostCard, CardGrid, type CardGridProps } from '@/components/Cards';
import { type PostCardProps } from './PostCard';

export type PostGridProps = CardGridProps & {
  posts: PostCardProps[];
  cta?: string;
};

export const PostGrid: React.FC<PostGridProps> = ({ posts, cta, ...props }) => {
  return (
    <CardGrid {...props}>
      {posts?.map((post, i) => (
        <PostCard key={i} cta={cta} {...post} />
      ))}
    </CardGrid>
  );
};
