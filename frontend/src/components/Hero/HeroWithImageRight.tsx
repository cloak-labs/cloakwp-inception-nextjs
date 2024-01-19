import { type FC } from 'react';
import { type HeroWithImageProps } from './HeroWithBgImage';
import { HeroContainer } from './parts/HeroContainer';
import { HeroContent } from './parts/HeroContent';
import Image from 'next/image';
import { cx } from '@/lib/utils/cva';

export const HeroWithImageRight: FC<
  Omit<HeroWithImageProps, 'contentWidth'>
> = ({ image, content, className, ...props }) => {
  return (
    <HeroContainer
      className={cx(
        'grid grid-cols-1 sm:grid-cols-7 lg:grid-cols-2',
        className
      )}
      {...props}
    >
      <div className="col-span-1 px-4 py-12 sm:col-span-4 sm:py-20 sm:pl-6 sm:pr-10 lg:col-span-1 xl:pl-20 2xl:pl-40">
        <HeroContent {...content} />
      </div>
      <div className="col-span-1 sm:col-span-3 sm:h-full lg:col-span-1">
        {image && image.src && (
          <Image
            src={image.src}
            priority={true}
            className="h-full max-h-[30vh] w-full object-cover xs:max-h-[40vh] sm:max-h-none"
            width={800}
            height={800}
            alt={image.alt || `hero section image`}
          />
        )}
      </div>
    </HeroContainer>
  );
};
