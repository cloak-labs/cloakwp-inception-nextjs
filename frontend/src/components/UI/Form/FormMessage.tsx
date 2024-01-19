import React from 'react';
import { useFormField } from './FormFieldContext';
import { cx } from '@/lib/utils/cva';

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cx(
        "text-[0.8rem] font-medium text-root-muted before:mr-1 before:text-destructive before:content-['*']",
        className
      )}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';
