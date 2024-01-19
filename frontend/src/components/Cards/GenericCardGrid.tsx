import React from 'react';
import { GenericCard, type GenericCardProps } from './GenericCard';
import { CardGrid, type CardGridProps } from './parts/CardGrid';

export type GenericCardGridProps = CardGridProps & {
  cards: GenericCardProps[];
  cta?: string;
};

export const GenericCardGrid: React.FC<GenericCardGridProps> = ({
  cards,
  cta,
  ...props
}) => {
  return (
    <CardGrid {...props}>
      {cards?.map((card, i) => (
        <GenericCard key={i} cta={cta} {...card} />
      ))}
    </CardGrid>
  );
};
