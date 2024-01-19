import { Typography, TypographyProps } from '@cloakui/react-primitives';
import { FC, ReactNode } from 'react';

export type EyebrowProps = {
  className?: string;
  children?: string | ReactNode;
};

export const Eyebrow: FC<TypographyProps> = (props) => {
  return (
    <Typography
      as="p"
      baseClassName="mb-0 min-w-fit font-mono text-sm font-semibold uppercase tracking-widest text-root-dim lg:text-md"
      {...props}
    />
  );
};
