import * as React from 'react';
import { cx } from '@/lib/utils/cva';
import { card, type CardVariants } from '@/lib/styles/card';

export type CardProps = {
  /** Allows using a more semantic HTML element than `div`, such as `article`, if your use-case requires it. */
  as?: 'div' | 'article';
  variants?: CardVariants;
} & React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variants, as, ...props }, ref) => {
    const Component: keyof JSX.IntrinsicElements = as || 'div';
    return (
      <Component
        ref={ref}
        className={cx(
          'group',
          card({ padding: 0, shadowSize: 'default', ...variants }),
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
