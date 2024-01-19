import React from 'react';
import { Testimonial, type TestimonialData } from './Testimonial';
import { CardGrid, type CardGridProps } from '../Cards/parts/CardGrid';

export type TestimonialGridProps = CardGridProps & {
  testimonials: TestimonialData[];
};

export const TestimonialGrid: React.FC<TestimonialGridProps> = ({
  testimonials,
  ...props
}) => {
  return (
    <CardGrid {...props}>
      {testimonials?.map(({ id, ...rest }) => (
        <Testimonial key={id} {...rest} />
      ))}
    </CardGrid>
  );
};
