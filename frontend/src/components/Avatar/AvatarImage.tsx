import { boxShadow } from '@/lib/styles/boxShadow';
import { ImageOptions } from '@/lib/types/sharedTypes';
import { cx } from '@/lib/utils/cva';
import React from 'react';

export type AvatarImageProps = ImageOptions &
  React.ComponentPropsWithoutRef<'span'> & {
    square?: boolean;
  };

export const AvatarImage: React.FC<AvatarImageProps> = ({
  src,
  alt,
  square = false,
  ...props
}) => {
  // src = null;
  return (
    <span
      className={cx(
        'inline-grid size-10 overflow-hidden bg-root align-middle *:col-start-1 *:row-start-1 sm:size-11',
        square
          ? 'rounded-[20%] *:rounded-[20%]'
          : 'rounded-full *:rounded-full',
        // boxShadow(), // TODO: consider moving new shadow classes below into boxShadow()
        'shadows-ease-in shadow shadow-root/5 shadows-5 shadow-y -shadow-spread-[1px] shadows-scale-2'
      )}
      {...props}
    >
      {src ? (
        <img className="inline-block" src={src} alt={alt} />
      ) : (
        <svg
          className="text-root-invert"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
      {/* Add an inset border that sits on top of the image */}
      <span
        className="ring-1 ring-inset ring-black/5 dark:ring-white/5 forced-colors:outline"
        aria-hidden="true"
      />
    </span>
  );
};
