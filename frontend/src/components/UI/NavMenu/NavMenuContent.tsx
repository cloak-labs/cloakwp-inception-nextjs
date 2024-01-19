import * as React from 'react';
import * as NavMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cx } from '@/lib/utils/cva';
import { useNavMenuContext } from './NavMenuContext';

type NavMenuContentPrimitiveProps = React.ComponentPropsWithoutRef<
  typeof NavMenuPrimitive.Content
>;
export type NavMenuContentProps = NavMenuContentPrimitiveProps & {
  fadeInOut?: boolean;
  slideInOut?: boolean;
};

export const NavMenuContent = React.forwardRef<
  React.ElementRef<typeof NavMenuPrimitive.Content>,
  NavMenuContentProps
>(({ className, fadeInOut = true, slideInOut = true, ...props }, ref) => {
  const { triggerContentOnClick } = useNavMenuContext();

  return (
    <NavMenuPrimitive.Content
      ref={ref}
      className={cx(
        'left-0 top-0 w-full md:w-auto xmd:absolute',
        // animations:
        fadeInOut &&
          'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out',
        slideInOut &&
          'data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52',
        className
      )}
      {...(triggerContentOnClick
        ? {
            onPointerEnter: (event) => event.preventDefault(),
            onPointerLeave: (event) => event.preventDefault(),
          }
        : {})}
      {...props}
    />
  );
});
NavMenuContent.displayName = NavMenuPrimitive.Content.displayName;
