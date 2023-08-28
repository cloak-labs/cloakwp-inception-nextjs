import { useEffect, useState } from 'react';
import { Link } from '@/components/Link';
import { Button } from '@/components/Button';
import { Container } from '@/components/Layout';
import { NavLinks } from '@/components/Layout';
import CMSLogo from '../../Logo/CMSLogo';
import classNames from '@/utils/classNames';
import { useGlobals } from 'cloakwp';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [isTop, setIsTop] = useState(true); // enables custom styling while header is sticky
  const { navBarData } = useGlobals();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && isTop) setIsTop(false);
      else if (window.scrollY === 0) setIsTop(true);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!navBarData || !navBarData.menu_items) return <></>;

  // the last menu item from WP becomes the header CTA button:
  const menuItems = navBarData?.menu_items.slice(0, -1);
  const menuButton = navBarData?.menu_items[navBarData?.menu_items.length - 1];

  return (
    <header
      className={classNames(
        'sticky top-0 z-50 w-full transition-all ease-in-out',
        isTop
          ? 'bg-white shadow-none'
          : 'bg-white/90 shadow-xl shadow-gray-900/5 backdrop-blur-sm'
      )}
    >
      <Container
        as="nav"
        className="relative flex w-full items-center justify-between py-4 pl-3 pr-2 xmd:gap-x-5 xmd:px-4 lg:gap-x-12 xl:gap-x-20"
      >
        <Link href="/" aria-label="Home" className="z-20 mr-auto flex-grow-0">
          <CMSLogo />
        </Link>

        <div className="hidden xmd:flex xmd:flex-grow xmd:justify-center xmd:gap-x-10 xl:gap-x-16 2xl:gap-x-20">
          <NavLinks links={menuItems} />
        </div>

        <MobileMenu links={menuItems} button={menuButton} />

        {menuButton && menuButton.url && (
          <Button href={menuButton.url} className="hidden xmd:block" color="blue">
            {menuButton.title}
          </Button>
        )}
      </Container>
    </header>
  );
}