import React from 'react';

export type ImageOptions = {
  src: string;
  alt: string;
};

export type HeroIconProps = React.ComponentProps<'svg'> & {
  title?: string;
  titleId?: string;
};
