import * as React from 'react';
import { useCarousel } from './CarouselContext';
import { cx } from '@/lib/utils/cva';

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation, gap, blendSlides } = useCarousel();
  const defaultBlendCn = cx(
    'hidden sm:flex absolute z-10 from-root to-transparent',
    orientation === 'horizontal' ? 'h-full w-12' : 'h-12 w-full'
  );

  return (
    <div
      ref={carouselRef}
      className={cx('overflow-hidden px-px py-3', blendSlides && 'sm:px-12')}
    >
      {blendSlides && (
        <>
          <div
            className={cx(
              defaultBlendCn,
              orientation === 'horizontal'
                ? 'left-0 bg-gradient-to-r'
                : 'top-0 bg-gradient-to-b'
            )}
          />
          <div
            className={cx(
              defaultBlendCn,
              orientation === 'horizontal'
                ? 'right-0 bg-gradient-to-l'
                : 'bottom-0 bg-gradient-to-t'
            )}
          />
        </>
      )}
      <div
        ref={ref}
        data-carousel-container={true}
        className={cx(
          'flex',
          orientation === 'vertical' && 'flex-col',
          className
        )}
        style={{
          marginLeft: orientation === 'horizontal' && `calc(${gap} * -1)`,
          marginTop: orientation === 'vertical' && `calc(${gap} * -1)`,
        }}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';
