'use client';

import React from 'react';
import * as NavMenuPrimitive from '@radix-ui/react-navigation-menu';
import { Link, type LinkProps } from '@cloakui/nextjs-primitives';
// import { navMenuTriggerStyle } from './NavMenuTrigger';
import { cx } from '@/lib/utils/cva';
import { useNavMenuContext } from './NavMenuContext';
import { navMenuTriggerStyle } from './NavMenuTrigger';

type NavMenuLinkPrimitiveProps = React.ComponentPropsWithoutRef<
  typeof NavMenuPrimitive.Link
>;
export type NavMenuLinkProps = NavMenuLinkPrimitiveProps & {
  linkProps?: Omit<LinkProps, 'children'>;
};

export const NavMenuLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  NavMenuLinkProps
>(({ href, children, className, linkProps, ...props }, ref) => {
  const { hasTrigger, orientation } = useNavMenuContext();

  return (
    <Link ref={ref} href={href} {...linkProps} legacyBehavior passHref>
      <NavMenuPrimitive.Link
        className={cx(
          !hasTrigger && navMenuTriggerStyle({ orientation }),
          className
        )}
        {...props}
      >
        {children}
      </NavMenuPrimitive.Link>
    </Link>
  );
});
NavMenuLink.displayName = NavMenuPrimitive.Link.displayName;
