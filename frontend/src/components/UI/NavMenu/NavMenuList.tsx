import * as React from 'react';
import * as NavMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cx } from '@/lib/utils/cva';
import { useNavMenuContext } from './NavMenuContext';

export const NavMenuList = React.forwardRef<
  React.ElementRef<typeof NavMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavMenuPrimitive.List>
>(({ className, ...props }, ref) => {
  const { orientation } = useNavMenuContext();

  return (
    <NavMenuPrimitive.List
      ref={ref}
      className={cx(
        'group flex flex-1 list-none justify-center *:w-full',
        orientation == 'horizontal' ? 'items-center space-x-1' : 'flex-col',
        className
      )}
      {...props}
    />
  );
});
NavMenuList.displayName = NavMenuPrimitive.List.displayName;
