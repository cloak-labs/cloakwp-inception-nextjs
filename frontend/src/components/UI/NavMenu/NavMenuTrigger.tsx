import * as React from 'react';
import * as NavMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva, cx } from '@/lib/utils/cva';
import { NavMenuProvider, useNavMenuContext } from './NavMenuContext';

export const navMenuTriggerStyle = cva({
  base: 'group border border-transparent w-full min-h-9 inline-flex items-center justify-start rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-root-dim hover:text-root-vivid focus:bg-root-dim focus:text-root-vivid focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-root-dim/50 data-[state=open]:bg-root-dim/50',
  variants: {
    orientation: {
      horizontal: '',
      vertical: 'py-4 rounded-none px-3',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

type NavMenuPrimitiveTriggerProps = React.ComponentPropsWithoutRef<
  typeof NavMenuPrimitive.Trigger
>;
export type NavMenuTriggerProps = NavMenuPrimitiveTriggerProps;

export const NavMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavMenuPrimitive.Trigger>,
  NavMenuTriggerProps
>(({ className, children, ...props }, ref) => {
  const { triggerContentOnClick, orientation } = useNavMenuContext();

  return (
    <NavMenuPrimitive.Trigger
      ref={ref}
      className={cx(navMenuTriggerStyle({ orientation }), className)}
      {...(triggerContentOnClick
        ? {
            onPointerMove: (event) => event.preventDefault(),
            onPointerLeave: (event) => event.preventDefault(),
          }
        : {})}
      {...props}
    >
      <NavMenuProvider value={{ hasTrigger: true }}>
        {children}{' '}
      </NavMenuProvider>
    </NavMenuPrimitive.Trigger>
  );
});
NavMenuTrigger.displayName = NavMenuPrimitive.Trigger.displayName;
