import React from 'react';
import { AvatarImage } from './AvatarImage';
import { ImageOptions } from '@/lib/types/sharedTypes';

export type AvatarProfileBadgeProps = {
  image?: ImageOptions;
  name: string;
  detail?: string;
};

export const AvatarProfileBadge: React.FC<AvatarProfileBadgeProps> = ({
  image: { src, alt } = {},
  name,
  detail,
}) => {
  return (
    <div className="flex flex-shrink-0 items-center">
      <AvatarImage src={src} alt={alt} />
      <div className="ml-3">
        <p className="text-sm font-medium text-root">{name}</p>
        {detail && (
          <p className="text-xs font-medium text-root-muted">{detail}</p>
        )}
      </div>
    </div>
  );
};
