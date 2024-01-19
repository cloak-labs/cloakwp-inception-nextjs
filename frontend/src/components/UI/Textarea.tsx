import * as React from 'react';
import { cx } from '@/lib/utils/cva';
import { input } from '@/lib/styles/input';

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    resizable?: boolean;
  };

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, resizable = true, ...props }, ref) => {
    return (
      <textarea
        className={cx(
          input({ type: 'textarea' }),
          resizable ? 'resize-y' : 'resize-none',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
