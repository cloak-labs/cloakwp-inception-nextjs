import React, { FC } from 'react';
import { ReactStyleProps } from '@cloakui/react-primitives';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselProps,
} from '@/components/UI/Carousel';
import { Testimonial, TestimonialData } from './Testimonial';
import { cx } from '@/lib/utils/cva';
import { CarouselNavOutside } from '../UI/Carousel/navigation/CarouselNavOutside';

export type TestimonialCarouselProps = ReactStyleProps & {
  testimonials: TestimonialData[];
  autoplay?: boolean;
  numVisible?: 1 | 2 | 3;
  carouselProps?: CarouselProps;
};

export const TestimonialCarousel: FC<TestimonialCarouselProps> = ({
  testimonials,
  numVisible = 2,
  carouselProps,
  className,
}) => {
  return (
    <div className="px-0 sm:px-10 xl:px-0">
      <Carousel className={className} blendSlides {...carouselProps}>
        <CarouselContent className="">
          {testimonials?.map((testimonial, i) => (
            <CarouselItem
              key={i}
              className={cx(
                'flex basis-full sm:block',
                numVisible >= 2 && 'xmd:basis-1/2',
                numVisible == 3 && 'lg:basis-1/3'
              )}
            >
              <Testimonial {...testimonial} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNavOutside className="hidden sm:flex" />
        <div className="flex justify-end sm:hidden">
          <CarouselPrevious className="mr-2" />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};
