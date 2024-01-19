import * as React from 'react';
import * as NavMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cx } from '@/lib/utils/cva';
import { NavMenuProvider } from './NavMenuContext';

type NavMenuPrimitiveProps = React.ComponentPropsWithoutRef<
  typeof NavMenuPrimitive.Root
>;

export type NavMenuProps = NavMenuPrimitiveProps;

export const NavMenu = React.forwardRef<
  React.ElementRef<typeof NavMenuPrimitive.Root>,
  NavMenuProps
>(({ className, orientation = 'horizontal', children, ...props }, ref) => (
  <NavMenuPrimitive.Root
    ref={ref}
    className={cx(
      'relative z-10 flex w-full flex-1 items-center justify-center',
      orientation == 'vertical' && '*:w-full',
      className
    )}
    orientation={orientation}
    {...props}
  >
    <NavMenuProvider value={{ orientation }}>{children}</NavMenuProvider>
  </NavMenuPrimitive.Root>
));
NavMenu.displayName = NavMenuPrimitive.Root.displayName;
