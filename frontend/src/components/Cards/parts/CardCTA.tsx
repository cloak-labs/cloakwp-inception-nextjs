import { cx } from '@/lib/utils/cva';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const CardCTA = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cx(
      'flex cursor-pointer items-center gap-2 text-link',
      className
    )}
    {...props}
  >
    <span className="text-sm font-semibold uppercase">{children}</span>
    <ArrowLongRightIcon className="size-5" />
  </div>
));
CardCTA.displayName = 'CardCTA';
