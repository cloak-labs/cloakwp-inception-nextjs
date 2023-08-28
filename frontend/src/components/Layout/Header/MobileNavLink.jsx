import { Popover } from '@headlessui/react';
import { Link } from '@/components/Link';

export function MobileNavLink({ children, ...props }) {
  return (
    <Popover.Button
      as={Link}
      className="block rounded-xl p-4 text-center text-base leading-7 tracking-tight text-gray-600 hover:bg-gray-100 hover:text-gray-700 md:text-lg"
      {...props}
    >
      {children}
    </Popover.Button>
  );
}