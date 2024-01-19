import * as React from 'react';
import * as NavMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cx } from '@/lib/utils/cva';
import { card } from '@/lib/styles/card';

/**
 * Uses RadixUI "Viewport" primitive: https://www.radix-ui.com/primitives/docs/components/navigation-menu#viewport
 * An optional viewport element that is used to render active content (eg. submenu dropdowns) outside of the nav menu list
 */

export const NavMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className="absolute left-1/2 top-full flex -translate-x-1/2 justify-center">
    <NavMenuPrimitive.Viewport
      className={cx(
        'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-root text-root md:w-[var(--radix-navigation-menu-viewport-width)]',
        // animations:
        'transition-all duration-200 ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90',
        card({ padding: 0, shadowSize: 'lg' }),
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavMenuViewport.displayName = NavMenuPrimitive.Viewport.displayName;
