import React from 'react';
import { createPortal } from 'react-dom';
import { Popover } from '@headlessui/react';
import { Bars2Icon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Link } from '@cloakui/nextjs-primitives';
import {
  NavMenu,
  NavMenuContent,
  NavMenuItem,
  NavMenuLink,
  NavMenuList,
  NavMenuTrigger,
  SubNavMenu,
  SubNavMenuIcon,
  SubNavMenuLink,
} from '@/components/UI/NavMenu';
import * as NavMenuPrimitive from '@radix-ui/react-navigation-menu';
import { boxShadow } from '@/lib/styles/boxShadow';
import { cx } from '@/lib/utils/cva';
import { type DesktopMenuProps } from './DesktopMenu';
import { Button } from '@/components/UI/Button';

export type MobileMenuProps = DesktopMenuProps & {
  button?: {
    url: string;
    title: string;
  };
};

export const MobileMenu = React.forwardRef<
  React.ElementRef<typeof NavMenuPrimitive.Root>,
  MobileMenuProps
>(({ links, button, className, ...props }, ref) => {
  return (
    <Popover className={cx(className)}>
      {({ open, close: closePopup }) => (
        <>
          <Popover.Button
            className="z-20 -m-2 inline-flex items-center rounded-lg p-2 pr-4 text-base hover:text-link active:text-link xmd:pr-0 [&:not(:focus-visible)]:focus:outline-none"
            aria-label="Toggle site navigation"
          >
            {({ open }) =>
              open ? (
                <ChevronUpIcon className="size-6" />
              ) : (
                <Bars2Icon className="size-6" />
              )
            }
          </Popover.Button>
          {open && (
            <>
              {
                // we use a React Portal to render the overlay in the `body` to avoid stacking context conflicts with sticky parent navbar
                createPortal(
                  <Popover.Overlay className="fixed inset-0 z-10 bg-root-dim/60 backdrop-blur-sm" />,
                  document.body
                )
              }
              <Popover.Panel
                static
                className={cx(
                  // positioning:
                  'absolute right-0 top-0 z-0 origin-top',
                  // padding:
                  'pb-3 pt-[60px] md:pt-[68px]',
                  // sizing:
                  'max-h-screen w-full overflow-y-auto xs:w-80 xs:max-w-sm',
                  // styling:
                  boxShadow({ shadowSize: 'xl', shadowDarken: 0 }),
                  'rounded-bl-xl bg-root -shadow-x-px'
                )}
              >
                <div className="flex flex-col items-center justify-center">
                  <NavMenu
                    orientation="vertical"
                    ref={ref}
                    className=""
                    {...props}
                  >
                    <NavMenuList className="">
                      {links?.map(
                        ({ id, title, url, sub_menu_items }, index) => (
                          <NavMenuItem
                            key={id}
                            value={id as string}
                            className={cx(
                              'relative w-full border-t border-root-dim',
                              index == links.length - 1 && 'border-b'
                            )}
                            triggerContentOnClick
                          >
                            {sub_menu_items?.length ? (
                              <>
                                <NavMenuTrigger
                                  className={
                                    url &&
                                    'has-[a:hover]:border-y-focus/30 data-[state=open]:border-b-root-dim'
                                  }
                                >
                                  <NavMenuLink
                                    className="peer"
                                    href={url}
                                    onClick={closePopup}
                                  >
                                    {title}
                                  </NavMenuLink>
                                  <span
                                    className={cx(
                                      'flex w-full justify-end',
                                      url &&
                                        'peer-hover:*:!-rotate-90 peer-hover:*:text-link'
                                    )}
                                  >
                                    <SubNavMenuIcon />
                                  </span>
                                </NavMenuTrigger>
                                <NavMenuContent
                                  slideInOut={false}
                                  fadeInOut={false}
                                  className="p-2"
                                >
                                  <SubNavMenu>
                                    <NavMenuList>
                                      {sub_menu_items?.map(
                                        ({ id, title, url, description }) => (
                                          <NavMenuItem>
                                            <SubNavMenuLink
                                              key={id}
                                              title={title}
                                              href={url}
                                              onClick={closePopup}
                                            >
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
                              <NavMenuLink href={url} onClick={closePopup}>
                                {title}
                              </NavMenuLink>
                            )}
                          </NavMenuItem>
                        )
                      )}
                    </NavMenuList>
                  </NavMenu>
                  {button && button.url && (
                    <div className="w-full px-3">
                      <Popover.Button
                        as={() => (
                          <Button
                            asChild
                            variants={{ variant: 'default' }}
                            className="mt-3 w-full"
                          >
                            <Link href={button.url}>{button.title}</Link>
                          </Button>
                        )}
                      />
                    </div>
                  )}
                </div>
              </Popover.Panel>
            </>
          )}
        </>
      )}
    </Popover>
  );
});
