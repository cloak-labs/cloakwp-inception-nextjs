import { useEffect, useState } from 'react';
import classNames from '@/utils/classNames';
import { Popover } from '@headlessui/react';
import { Link } from '@/components/Link';
import { Button } from '@/components/Button';
import { Container } from '@/components/Layout';
import { NavLinks } from '@/components/Layout';
import { HeroIcon } from '@/components/Icons';
import CMSLogo from '../Logo/CMSLogo';
import { useGlobals } from 'cloakwp';

function MobileNavLink({ children, ...props }) {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 tracking-tight text-blue-800 md:text-lg hover:text-gray-500 hover:bg-gray-100/50 p-4 rounded-xl text-center"
      {...props}
    >
      {children}
    </Popover.Button>
  )
}

export function Header() {
  const [isTop, setIsTop] = useState(true);
  const { navBarData } = useGlobals()
  
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

  if(!navBarData || !navBarData.menu_items) return <></>

  const menuItems = navBarData?.menu_items.slice(0, -1)
  const menuButton = navBarData?.menu_items[navBarData?.menu_items.length - 1]
  
  return (
    <header className={classNames(
      'sticky top-0 z-50 w-full transition-all ease-in-out',
      isTop ? 'bg-white shadow-none' : 'bg-white/90 shadow-xl shadow-gray-900/5 backdrop-blur-sm'
    )}>
      <nav className=''>
        <Container className="relative z-50 justify-between px-0 sm:px-0 md:px-0 xmd:px-4">
          <div className="relative z-10 flex w-full items-center py-4 xmd:gap-5 lg:gap-12 xl:gap-x-20">
            <Link href="/" aria-label="Home" className='z-50 pl-4 mr-auto flex-grow-0 xmd:pl-0'>
              <CMSLogo />
            </Link>
            <div className="hidden xmd:justify-center xmd:flex-grow xmd:flex xmd:gap-x-10 xl:gap-x-16 2xl:gap-x-20">
              <NavLinks links={menuItems}/>
            </div>

            {/* Mobile Menu */}
            <Popover className="flex justify-end xmd:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg text-gray-800 p-2 pr-4 xmd:pr-0 hover:text-blue-900 active:text-blue-700 [&:not(:focus-visible)]:focus:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <HeroIcon icon="chevron-up" className="w-6 h-6" />
                        ) : (
                        <HeroIcon icon="bars-2" className="w-6 h-6" />
                      )
                    }
                  </Popover.Button>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          // as={'div'}
                          className="fixed inset-0 z-0 bg-gray-100/60 backdrop-blur"
                        />
                        <Popover.Panel
                          static
                          // as={'div'}
                          className="absolute inset-x-0 top-0 z-0 px-6 pt-24 pb-6 origin-top shadow-2xl rounded-b-2xl bg-gray-50 shadow-gray-900/20"
                        >
                          <div className="space-y-2 mb-4">
                            {menuItems?.map(({title, url}, index) => <MobileNavLink key={index} href={url}>{title}</MobileNavLink> )}
                          </div>
                          {menuButton && menuButton.url && (
                            <div className="flex justify-center">
                              <Popover.Button as={Button} href={menuButton.url}>{menuButton.title}</Popover.Button>
                            </div>
                          )}
                        </Popover.Panel>
                      </>
                    )}
                </>
              )}
            </Popover>
            {/* END Mobile Menu */}

            {menuButton && menuButton.url && (
              <Button href={menuButton.url} className="hidden xmd:block">
                {menuButton.title}
              </Button>
            )}
          </div>
        </Container>
      </nav>
    </header>
  )
}
