import { HeroIconProps } from '@/lib/types/sharedTypes';
import { cx } from '@/lib/utils/cva';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React from 'react';

export const SubNavMenuIcon: React.FC<HeroIconProps> = ({ className }) => {
  return (
    <ChevronDownIcon
      className={cx(
        'relative top-[1px] ml-1.5 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180',
        className
      )}
      aria-hidden="true"
    />
  );
};
