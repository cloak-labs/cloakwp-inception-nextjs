import { cx } from '@/lib/utils/cva';
import React from 'react';
import { ReactStyleProps } from '@cloakui/react-primitives';
import { CardGridVariants, cardGrid } from '@/lib/styles/cardGrid';

export type CardGridProps = ReactStyleProps & {
  variants?: CardGridVariants;
};

export const CardGrid: React.FC<React.PropsWithChildren<CardGridProps>> = ({
  variants,
  className,
  children,
  ...props
}) => {
  return (
    <div className={cx(cardGrid(variants), className)} {...props}>
      {children}
    </div>
  );
};
