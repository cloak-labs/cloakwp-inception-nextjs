import React from 'react';
import { useFormField } from './FormFieldContext';
import { cx } from '@/lib/utils/cva';

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cx('text-[0.8rem] text-root-muted', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';
