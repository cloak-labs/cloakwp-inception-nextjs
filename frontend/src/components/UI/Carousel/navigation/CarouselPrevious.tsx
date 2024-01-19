import * as React from 'react';
import { Button } from '@/components/UI/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useCarousel } from '@/components/UI/Carousel';
import { cx } from '@/lib/utils/cva';

export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variants, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variants={{ variant: 'outline', size: 'icon', ...variants }}
      className={cx('z-20 size-7 rounded-full sm:size-8', className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeftIcon className="size-3.5 sm:size-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';
