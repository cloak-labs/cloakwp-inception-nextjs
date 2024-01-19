import React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { Label } from '../Label';
import { useFormField } from './FormFieldContext';
import { cx } from '@/lib/utils/cva';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <>
      {error && (
        <ExclamationTriangleIcon
          className="relative mr-1.5 inline-flex size-4 text-destructive"
          aria-hidden="true"
        />
      )}
      <Label ref={ref} className={className} htmlFor={formItemId} {...props} />
    </>
  );
});
FormLabel.displayName = 'FormLabel';
