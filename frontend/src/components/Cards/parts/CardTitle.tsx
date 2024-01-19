import { cx } from '@/lib/utils/cva';
import React from 'react';

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cx(
      'break-words text-lg font-semibold leading-tight tracking-tight text-root',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';
