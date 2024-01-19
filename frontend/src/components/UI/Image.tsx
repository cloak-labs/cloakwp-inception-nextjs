import React from 'react';
import { cx } from '@/lib/utils/cva';
import {
  Image as CloakImage,
  type ImageProps as CloakImageProps,
} from '@cloakui/nextjs-primitives';
import { imageStyles, imageCaptionStyles } from '@cloakui/styles';
import { boxShadow } from '@/lib/styles/boxShadow';

export type ImageProps = CloakImageProps;

/** A simple wrapper around the Image component from `@cloakui/nextjs-primitives`, simply for the purpose of applying our own defaults */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, captionClassName, ...props }, ref) => {
    return (
      <CloakImage
        ref={ref}
        className={cx(imageStyles(), boxShadow(), 'rounded-lg', className)}
        captionClassName={cx(imageCaptionStyles(), captionClassName)}
        {...props}
      />
    );
  }
);
