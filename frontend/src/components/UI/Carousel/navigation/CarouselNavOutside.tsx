import { cx } from '@/lib/utils/cva';
import { useCarousel } from '../CarouselContext';
import { CarouselNext } from './CarouselNext';
import { CarouselPrevious } from './CarouselPrevious';

/**
 * CarouselNavOutside is a styled abstraction around CarouselPrevious & CarouselNext that positions
 * them outside the carousel contents/items on opposite ends, like this: (<) [item] [item] [item] (>)
 */
export const CarouselNavOutside = ({ className }: { className?: string }) => {
  const { orientation, blendSlides } = useCarousel();
  const defaultCn =
    orientation === 'horizontal'
      ? 'top-1/2 -translate-y-1/2'
      : 'left-1/2 -translate-x-1/2 rotate-90';

  return (
    <div className={className}>
      <CarouselPrevious
        className={cx(
          'absolute',
          defaultCn,
          orientation === 'horizontal'
            ? blendSlides
              ? '-left-10 sm:-left-6 lg:-left-8'
              : '-left-10 lg:-left-12'
            : blendSlides
            ? '-top-10 sm:-top-6 lg:-top-8'
            : '-top-10 lg:-top-12'
        )}
      />
      <CarouselNext
        className={cx(
          'absolute',
          defaultCn,
          orientation === 'horizontal'
            ? blendSlides
              ? '-right-10 sm:-right-6 lg:-right-8'
              : '-right-10 lg:-right-12'
            : blendSlides
            ? '-bottom-10 sm:-bottom-6 lg:-bottom-8'
            : '-bottom-10 lg:-bottom-12'
        )}
      />
    </div>
  );
};
