import * as React from 'react';
import { Button } from '@/components/UI/Button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useCarousel } from '@/components/UI/Carousel';
import { cx } from '@/lib/utils/cva';

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variants, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variants={{ variant: 'outline', size: 'icon', ...variants }}
      className={cx('z-20 size-7 rounded-full sm:size-8', className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRightIcon className="size-3.5 sm:size-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = 'CarouselNext';
