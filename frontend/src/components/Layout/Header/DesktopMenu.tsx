import React from 'react';
import {
  NavMenu,
  type NavMenuProps,
  NavMenuContent,
  NavMenuItem,
  NavMenuLink,
  NavMenuList,
  NavMenuTrigger,
  SubNavMenuLink,
  NavMenuViewport,
  SubNavMenuIcon,
} from '@/components/UI/NavMenu';
import * as NavMenuPrimitive from '@radix-ui/react-navigation-menu';
import { WPMenuItem } from 'cloakwp';
import { cx } from '@/lib/utils/cva';
import { SubNavMenu } from '@/components/UI/NavMenu/SubNavMenu';

export type DesktopMenuProps = NavMenuProps & {
  links: WPMenuItem[];
};

export const DesktopMenu = React.forwardRef<
  React.ElementRef<typeof NavMenuPrimitive.Root>,
  DesktopMenuProps
>(({ links, ...props }, ref) => {
  const [activeItemId, setActiveItemId] = React.useState('');

  return (
    <NavMenu
      ref={ref}
      value={activeItemId}
      onValueChange={setActiveItemId}
      {...props}
    >
      <NavMenuList>
        {links?.map(({ id, title, url, sub_menu_items }) => {
          const isActive = id === activeItemId;
          return (
            <NavMenuItem key={id} value={id as string}>
              {sub_menu_items?.length ? (
                <>
                  <NavMenuTrigger
                    className={cx(url && 'has-[a:hover]:border-root/30')}
                  >
                    <NavMenuLink className="peer" href={url}>
                      {title}
                    </NavMenuLink>
                    <SubNavMenuIcon
                      className={
                        url && 'peer-hover:!-rotate-90 peer-hover:text-link'
                      }
                    />
                  </NavMenuTrigger>
                  <NavMenuContent
                    // Force mount + use state for visibility to ensure links are always rendered for SEO purposes:
                    forceMount
                    style={{ display: isActive ? 'block' : 'none' }}
                  >
                    <SubNavMenu>
                      <NavMenuList
                        className={cx(
                          // use 2-column submenu when there are 4 or more submenu items:
                          sub_menu_items.length <= 2
                            ? 'p-2 md:w-[300px]'
                            : 'grid grid-cols-2 gap-x-2 gap-y-1 space-y-0 p-3 md:w-[475px]'
                        )}
                      >
                        {sub_menu_items?.map(
                          ({ id, title, url, description }) => (
                            <NavMenuItem key={id}>
                              <SubNavMenuLink title={title} href={url}>
                                {description && (
                                  <p className="mt-1.5 line-clamp-2 text-sm leading-snug !text-root-muted">
                                    {description}
                                  </p>
                                )}
                              </SubNavMenuLink>
                            </NavMenuItem>
                          )
                        )}
                      </NavMenuList>
                    </SubNavMenu>
                  </NavMenuContent>
                </>
              ) : (
                <NavMenuLink href={url}>{title}</NavMenuLink>
              )}
            </NavMenuItem>
          );
        })}
      </NavMenuList>
      <NavMenuViewport />
    </NavMenu>
  );
});
