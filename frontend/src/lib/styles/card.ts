import { compose, cva } from '@/lib/utils/cva';
import { boxShadow } from './boxShadow';
import { type VariantProps } from 'cva';

const root = cva({
  base: 'rounded-lg overflow-hidden bg-root dark:bg-root-vivid',
  variants: {
    padding: {
      0: 'p-0',
      2: 'p-2',
      4: 'p-4',
      5: 'p-5',
    },
  },
  defaultVariants: {
    padding: 5,
  },
});

export interface CardVariants extends VariantProps<typeof card> {}

/**
 * The `card` function helps you to apply card-like Tailwind classes to
 * an element. Since it's used throughout various components, it provides a single
 * global place to update your card styling.
 *
 * Using the wonderful class-variance-authority (cva) package: https://cva.style/docs
 */
export const card = compose(root, boxShadow);
