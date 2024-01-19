import { type FC } from 'react';
import { HeroContainer } from './parts/HeroContainer';
import { HeroContent } from './parts/HeroContent';
import { HeroProps } from './Hero';
import { cx } from '@/lib/utils/cva';
import { container } from '@/lib/styles/container';
import { ImageOptions } from '@/lib/types/sharedTypes';

export type HeroWithImageProps = HeroProps & {
  image?: ImageOptions;
};

export const HeroWithBgImage: FC<HeroWithImageProps> = ({
  image,
  className,
  style,
  contentWidth = 'wide',
  content,
  ...props
}) => {
  return (
    <HeroContainer
      className={cx('py-24', className)}
      style={{
        backgroundImage: `url(${image.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...style,
      }}
      {...props}
    >
      <div
        id="hero-overlay"
        className="absolute left-0 top-0 h-full w-full bg-root-invert/90 dark:bg-root/80"
      />
      <HeroContent
        {...content}
        className={cx(
          'dark [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]',
          container({ width: contentWidth })
        )}
      />
    </HeroContainer>
  );
};
