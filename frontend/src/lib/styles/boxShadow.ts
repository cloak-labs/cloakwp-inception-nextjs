import { cva } from '@/lib/utils/cva';
import { type VariantProps } from 'cva';

/**
 * The `boxShadow` function helps you to apply consistent sets of shadow-related Tailwind
 * classes to elements throughout the site. It provides a single place to update your
 * shadow styling sitewide.
 *
 * Using the wonderful class-variance-authority (cva) package: https://cva.style/docs
 */

export const boxShadow = cva({
  base: 'shadow-sm shadow-root shadows-scale-1.75 shadows-4 -shadow-spread-0.5 shadow-opacity-[3] dark:shadow-opacity-15 shadows-ease-out',
  variants: {
    shadowSize: {
      sm: 'shadows-scale-1.5 shadow-y-[2px] shadow-opacity-[5] dark:shadow-opacity-[17]',
      default: 'shadow-y-[2px] shadow-opacity-[4] dark:shadow-opacity-[17]',
      md: 'shadows-5 shadow-y-[2px]',
      lg: 'shadows-6 shadow-y-[2px]',
      xl: 'shadows-6 shadows-scale-2 shadow-y-[3px] -shadow-spread-1',
      '2xl': 'shadows-7 shadows-scale-2 shadow-y-[4px] shadow-spread-0',
    },
    shadowDarken: {
      0: '',
      1: 'shadow-opacity-[8] dark:shadow-opacity-20',
      2: 'shadow-opacity-[13] dark:shadow-opacity-25',
      3: 'shadow-opacity-20 dark:shadow-opacity-30',
      4: 'shadow-opacity-25 dark:shadow-opacity-35',
    },
    border: {
      default:
        'border border-root-invert/15 dark:border-root/30 dark:border-t-0 dark:highlight-root-invert/10', // we use a dark border with low opacity for cleaner shadows: https://twitter.com/jamesm/status/1622702890912456704
      none: '',
    },
  },
  defaultVariants: {
    shadowSize: 'default',
    shadowDarken: 0,
    border: 'default',
  },
});

export type BoxShadowProps = VariantProps<typeof boxShadow>;
