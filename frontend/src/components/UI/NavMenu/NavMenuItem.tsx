import * as React from 'react';
import * as NavMenuPrimitive from '@radix-ui/react-navigation-menu';
import { NavMenuProvider } from './NavMenuContext';

type NavMenuItemPrimitiveProps = React.ComponentPropsWithoutRef<
  typeof NavMenuPrimitive.Item
>;

export type NavMenuItemProps = NavMenuItemPrimitiveProps & {
  /** When true, the nested NavMenuContent will only display when you click this item's trigger, otherwise it displays on hover of the trigger. */
  triggerContentOnClick?: boolean;
};

export const NavMenuItem = React.forwardRef<
  React.ElementRef<typeof NavMenuPrimitive.Item>,
  NavMenuItemProps
>(({ triggerContentOnClick = false, children, ...props }, ref) => (
  <NavMenuPrimitive.Item ref={ref} {...props}>
    <NavMenuProvider value={{ triggerContentOnClick, hasTrigger: false }}>
      {children}
    </NavMenuProvider>
  </NavMenuPrimitive.Item>
));
NavMenuItem.displayName = NavMenuPrimitive.Item.displayName;
