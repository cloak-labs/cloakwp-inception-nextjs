import { cva } from '@/lib/utils/cva';
import { type VariantProps } from 'cva';

/**
 * The `container` function helps you apply container Tailwind classes to
 * an element. You can contain something in a max-width and center it without
 * having to wrap it in a parent `div` -- it's just CSS. Simply provide an object
 * with property `width` set to one of the available options, such as "default",
 * "wide", or "full" (or don't provide anything to use "default").
 *
 * Using the wonderful class-variance-authority (cva) package: https://cva.style/docs
 */

export const container = cva({
  base: 'mx-auto',
  variants: {
    padding: {
      default: 'px-4 sm:px-6 lg:px-9',
      none: '',
    },
    width: {
      default: 'max-w-4xl',
      wide: 'max-w-6xl',
      full: 'px-0 sm:px-0 lg:px-0', // turn off padding
    },
  },
  defaultVariants: {
    width: 'default',
    padding: 'default',
  },
});

export type ContainerVariants = VariantProps<typeof container>;
