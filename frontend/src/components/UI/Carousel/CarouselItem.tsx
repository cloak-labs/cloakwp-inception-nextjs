import * as React from 'react';
import { cx } from '@/lib/utils/cva';
import { useCarousel } from './CarouselContext';

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation, gap } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cx('min-w-0 shrink-0 grow-0 basis-full', className)}
      style={{
        paddingLeft: orientation === 'horizontal' && gap,
        paddingTop: orientation === 'vertical' && gap,
      }}
      {...props}
    />
  );
});
CarouselItem.displayName = 'CarouselItem';
