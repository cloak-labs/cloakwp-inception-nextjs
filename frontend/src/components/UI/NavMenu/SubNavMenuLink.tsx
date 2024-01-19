import { cx } from '@/lib/utils/cva';
import { NavMenuLink, type NavMenuLinkProps } from './NavMenuLink';
import React from 'react';

export const SubNavMenuLink = React.forwardRef<
  React.ElementRef<typeof NavMenuLink>,
  NavMenuLinkProps
>(({ className, title, children, ...props }, ref) => {
  return (
    <NavMenuLink
      ref={ref}
      className={cx(
        'block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors',
        // hover states:
        'hover:bg-root-dim hover:text-root-vivid',
        // focus states:
        'focus:bg-root-dim focus:text-root-vivid',
        className
      )}
      {...props}
    >
      <div className="text-sm font-medium leading-none text-root">{title}</div>
      {children}
    </NavMenuLink>
  );
});
SubNavMenuLink.displayName = 'ListItem';
