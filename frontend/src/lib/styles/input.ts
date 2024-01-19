import { cva } from '@/lib/utils/cva';

export const input = cva({
  base: 'w-full rounded-sm border border-root bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-root-muted dark:bg-root-invert/5',
  variants: {
    type: {
      input:
        'h-9 flex file:border-0 file:bg-transparent file:text-sm file:font-medium',
      textarea: 'flex min-h-[60px] py-2',
      select:
        'h-9 flex items-center justify-between whitespace-nowrap py-2 [&>span]:line-clamp-1',
      checkbox:
        'peer size-4 p-0 shrink-0 rounded-xs shadow data-[state=checked]:bg-primary data-[state=checked]:text-primary',
    },
    focus: {
      default:
        'focus-visible:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/20',
    },
    disabled: {
      default: 'disabled:cursor-not-allowed disabled:opacity-50',
    },
  },
  defaultVariants: {
    type: 'input',
    focus: 'default',
    disabled: 'default',
  },
});
