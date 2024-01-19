import { Date, TypographyH1 } from '@cloakui/react-primitives';
import { cx } from '@/lib/utils/cva';
import { container } from '@/lib/styles/container';
import { Link } from '@cloakui/nextjs-primitives';
import { Image } from '@/components/UI/Image';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import {
  AvatarProfileBadge,
  AvatarProfileBadgeProps,
} from '@/components/Avatar/AvatarProfileBadge';
import { ImageOptions } from '@/lib/types/sharedTypes';
import React from 'react';
import { HeroContainer } from './parts/HeroContainer';

export type HeroSinglePostProps = {
  date: string;
  h1: string;
  author?: AvatarProfileBadgeProps;
  image?: ImageOptions;
};

export const HeroSinglePost: React.FC<HeroSinglePostProps> = ({
  date,
  h1,
  author,
  image,
}) => {
  return (
    <>
      <HeroContainer
        className={cx(
          'bg-root-dim pt-8 fx-bg-dot-black/20 dark:fx-bg-dot-white/15',
          image?.src ? 'pb-32 xs:pb-48 sm:pb-56 md:pb-64 lg:pb-72' : 'pb-12'
        )}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-root [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div
          className={container({
            width: 'default',
            className: 'relative z-20',
          })}
        >
          <Link
            href="/blog"
            className="-ml-1 flex w-fit items-center pb-10 text-sm font-semibold text-root-dim hover:text-root"
          >
            <ChevronLeftIcon className="mr-2 size-4 text-root-muted" />
            Back to Blog
          </Link>
          <Date dateTime={date} options={{ month: 'long' }} />
          <TypographyH1 className="mb-6 mt-2 text-pretty text-2xl font-extrabold xs:text-3xl sm:text-4xl lg:text-4xl">
            {h1}
          </TypographyH1>
          {author && (
            <AvatarProfileBadge
              image={author.image}
              name={author.name}
              detail={author.detail ?? 'Author'}
            />
          )}
        </div>
      </HeroContainer>
      {image?.src && (
        <Image
          src={image.src}
          alt={image.alt || 'featured image for this post'}
          className="shadows-ease-out aspect-video shadow-md shadow-root/10 shadows-4 shadow-y-[4px] -shadow-spread-[2px] shadows-scale-1.75"
          cntrClassName={cx(
            '-mt-24 xs:-mt-36 sm:-mt-44 md:-mt-52 lg:-mt-60',
            container({ width: 'default' })
          )}
        />
      )}
    </>
  );
};
