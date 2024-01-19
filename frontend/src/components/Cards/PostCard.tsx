import React from 'react';
import { Link } from '@cloakui/nextjs-primitives';
import { getObjValueByString } from '@/lib/utils/getObjValueByString';
import { cx } from '@/lib/utils/cva';
import { formatDate } from '@cloakui/utils';
import { type ImageOptions } from '@/lib/types/sharedTypes';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
  CardCTA,
  type GenericCardProps,
} from '.';

export type PostCardProps = GenericCardProps & {
  image?: ImageOptions;
  /** An object containing all metadata for the current post (see related `visiblePostMeta` prop) */
  postMeta: Record<string, any>;
  /** Determines which metadata to display from the postMeta object. Should be an array of strings referencing keys in the provided `postMeta` object */
  visiblePostMeta: string[];
};

export const PostCard: React.FC<PostCardProps> = ({
  image,
  title,
  description,
  cta,
  href,
  postMeta,
  visiblePostMeta,
}) => {
  return (
    <Link href={href}>
      <Card
        as="article"
        className="transition-colors duration-200 hover:border-root hover:bg-root-dim/50"
      >
        <CardImage
          src={image.src || '/images/placeholder.png'}
          alt={image.alt}
        />
        <CardHeader
          className={cx(
            'relative flex flex-col px-4 pt-5',
            cta ? 'pb-14' : 'pb-5'
          )}
        >
          <CardTitle>{title}</CardTitle>
          {description && (
            <CardDescription className="line-clamp-3 text-sm">
              {description}
            </CardDescription>
          )}
          {cta && <CardCTA className="absolute bottom-4">{cta}</CardCTA>}
        </CardHeader>
        {visiblePostMeta?.length > 0 && (
          <CardFooter className="gap-3 border-t border-root-dim px-4 py-2.5 text-sm text-root-muted group-hover:border-root">
            {visiblePostMeta.map((meta: string, i: number) => {
              let value = getObjValueByString(postMeta, meta); // supports cases where meta is a nested property, eg. meta == 'author.display_name'

              if (meta == 'date' || meta == 'last_modified') {
                value = formatDate({ dateTime: value as string });
              }

              return (
                <React.Fragment key={i}>
                  {value && typeof value == 'string' && (
                    <>
                      <figcaption>{value}</figcaption>
                      {i < visiblePostMeta.length - 1 && <span>|</span>}
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};
