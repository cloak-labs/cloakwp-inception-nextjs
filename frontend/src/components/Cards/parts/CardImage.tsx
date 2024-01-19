import { Image, ImageProps } from '@/components/UI/Image';
import { cx } from '@/lib/utils/cva';
import React from 'react';

export const CardImage = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt, width, height, ...props }, ref) => (
    <div className="overflow-hidden border-b border-root-dim group-hover:border-root">
      <Image
        ref={ref}
        width={width || '320'}
        height={height || '240'}
        alt={alt || `featured image for card`}
        className={cx(
          'aspect-video w-full rounded-none border-0 object-cover shadow-none transition duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-90',
          className
        )}
        {...props}
      />
    </div>
  )
);
CardImage.displayName = 'CardImage';
