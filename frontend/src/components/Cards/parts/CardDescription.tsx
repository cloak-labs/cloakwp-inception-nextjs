import { cx } from '@/lib/utils/cva';
import React from 'react';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cx('text-base leading-normal text-root-muted', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';
