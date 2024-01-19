import React, { useEffect, useState } from 'react';
import { Link } from '@cloakui/nextjs-primitives';
import { CMSLogo } from '@/components/Logo/CMSLogo';
import { DesktopMenu, MobileMenu } from '@/components/Layout';
import { ThemeToggle } from '@/components/Theme/ThemeToggle';
import { cx } from '@/lib/utils/cva';
import { container } from '@/lib/styles/container';
import { useGlobals } from '@cloakwp/react';
import { Button } from '@/components/UI/Button';

export const Header = () => {
  const [isTop, setIsTop] = useState(
    typeof window != 'undefined' ? window.scrollY === 0 : true
  ); // enables custom styling while we're at the very top of page

  const { headerMenuData } = useGlobals();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && isTop) setIsTop(false);
      else if (window.scrollY === 0) setIsTop(true);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTop]);

  // the last menu item from WP becomes the header CTA button:
  const menuItems = headerMenuData?.menu_items?.slice(0, -1);
  const menuButton =
    headerMenuData?.menu_items?.[headerMenuData?.menu_items?.length - 1];

  return (
    <header
      className={cx(
        'sticky z-50 w-full border-b border-root-dim transition-all ease-in-out',
        isTop
          ? 'bg-root shadow-none'
          : 'top-0 bg-root/90 shadow-xl shadow-root/5 backdrop-blur-sm dark:shadow-opacity-30'
      )}
    >
      <div
        className={cx(
          container({ width: 'wide' }),
          'flex w-full items-center justify-between bg-root py-3 pl-3 pr-2 md:py-4 xmd:gap-x-5 xmd:px-4 lg:gap-x-12 xl:gap-x-20'
        )}
      >
        <Link
          href="/"
          aria-label="Home"
          className="z-30 mr-auto xmd:mr-0 xmd:min-w-[200px]"
        >
          <CMSLogo />
        </Link>

        {menuItems && (
          <>
            <DesktopMenu links={menuItems} className="hidden xmd:flex" />
            <MobileMenu
              links={menuItems}
              button={menuButton}
              className="flex xmd:hidden"
            />
          </>
        )}

        <div className="z-30 flex justify-end gap-2 xmd:min-w-[200px]">
          {menuButton && menuButton.url && (
            <Button
              asChild
              variants={{ variant: 'default' }}
              className="hidden xmd:block"
            >
              <Link href={menuButton.url}>{menuButton.title}</Link>
            </Button>
          )}

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
