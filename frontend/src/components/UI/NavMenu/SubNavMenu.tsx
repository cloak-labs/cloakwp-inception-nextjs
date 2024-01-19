import * as React from 'react';
import * as NavMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cx } from '@/lib/utils/cva';
import { NavMenuProvider } from './NavMenuContext';

type SubNavMenuPrimitiveProps = React.ComponentPropsWithoutRef<
  typeof NavMenuPrimitive.Sub
>;

export type SubNavMenuProps = SubNavMenuPrimitiveProps;

export const SubNavMenu = React.forwardRef<
  React.ElementRef<typeof NavMenuPrimitive.Sub>,
  SubNavMenuProps
>(({ className, children, orientation = 'vertical', ...props }, ref) => (
  <NavMenuPrimitive.Sub
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
  </NavMenuPrimitive.Sub>
));
SubNavMenu.displayName = NavMenuPrimitive.Sub.displayName;
