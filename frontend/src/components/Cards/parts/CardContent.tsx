import { cx } from '@/lib/utils/cva';
import React from 'react';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cx('p-5 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';
