import { boxShadow } from '@/lib/styles/boxShadow';
import { cva } from '@/lib/utils/cva';
import { VariantProps } from 'cva';

export const accordionStyle = cva({
  base: '',
  variants: {
    variant: {
      inline: '',
      boxed: 'space-y-3',
    },
  },
  defaultVariants: {
    variant: 'inline',
  },
});

export type AccordionVariants = VariantProps<typeof accordionStyle>;

export const accordionItemStyle = cva({
  base: '',
  variants: {
    variant: {
      inline: '',
      boxed: `px-4 rounded-md dark:bg-root-vivid ${boxShadow({
        shadowSize: 'sm',
      })}`,
    },
  },
  defaultVariants: {
    variant: 'inline',
  },
});
