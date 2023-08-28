import { Popover } from '@headlessui/react';
import { Bars2Icon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { MobileNavLink } from './MobileNavLink';
import { Button } from '@/components/Button';

export function MobileMenu({ links, button }) {
  return (
    <Popover className="flex justify-end xmd:hidden">
      {({ open }) => (
        <>
          <Popover.Button
            className="relative z-10 -m-2 inline-flex items-center rounded-lg p-2 pr-4 text-gray-800 hover:text-blue-900 active:text-blue-700 xmd:pr-0 [&:not(:focus-visible)]:focus:outline-none"
            aria-label="Toggle site navigation"
          >
            {({ open }) =>
              open ? (
                <ChevronUpIcon className="h-6 w-6" />
              ) : (
                <Bars2Icon className="h-6 w-6" />
              )
            }
          </Popover.Button>
          {open && (
            <>
              <Popover.Overlay
                static
                className="fixed inset-0 z-0 bg-gray-100/60 backdrop-blur"
              />
              <Popover.Panel
                static
                className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-24 shadow-2xl shadow-gray-900/20"
              >
                <div className="mb-4 space-y-2">
                  {links?.map(({ title, url }, index) => (
                    <MobileNavLink key={index} href={url}>
                      {title}
                    </MobileNavLink>
                  ))}
                </div>
                {button && button.url && (
                  <div className="flex justify-center">
                    <Popover.Button as={Button} href={button.url}>
                      {button.title}
                    </Popover.Button>
                  </div>
                )}
              </Popover.Panel>
            </>
          )}
        </>
      )}
    </Popover>
  );
}
