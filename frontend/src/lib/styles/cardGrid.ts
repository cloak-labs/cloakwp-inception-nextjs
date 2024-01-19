import { cva } from '@/lib/utils/cva';
import { type VariantProps } from 'cva';

/**
 * The `cardGrid` function helps you apply a grid around card-like elements (assumes
 * that cards have a minimum width where you wouldn't apply more than 4 columns).
 *
 * Using the wonderful class-variance-authority (cva) package: https://cva.style/docs
 */
export const cardGrid = cva({
  base: 'gap-4 justify-center',
  variants: {
    type: {
      grid: 'grid sm:grid-cols-2',
      masonry: 'space-y-4 sm:columns-2',
    },
    cols: {
      2: '',
      3: '',
    },
  },
  compoundVariants: [
    {
      type: 'grid',
      cols: 3,
      className: 'xmd:grid-cols-3',
    },
    {
      type: 'masonry',
      cols: 3,
      className: 'xmd:columns-3',
    },
  ],
  defaultVariants: {
    type: 'grid',
    cols: 3,
  },
});

export interface CardGridVariants extends VariantProps<typeof cardGrid> {}
