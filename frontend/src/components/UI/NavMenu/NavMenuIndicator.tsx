import * as React from 'react';
import * as NavMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cx } from '@/lib/utils/cva';

export const NavMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavMenuPrimitive.Indicator
    ref={ref}
    className={cx(
      'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-root-invert shadow-md" />
  </NavMenuPrimitive.Indicator>
));
NavMenuIndicator.displayName = NavMenuPrimitive.Indicator.displayName;
