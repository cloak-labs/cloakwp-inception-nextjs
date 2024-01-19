'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cx } from '@/lib/utils/cva';
import { CheckIcon } from '@heroicons/react/20/solid';
import { input } from '@/lib/styles/input';

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={input({ type: 'checkbox', className })}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cx('flex items-center justify-center text-current')}
    >
      <CheckIcon className="size-3.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
