import { cva, cx, compose } from '@/lib/utils/cva';
import {
  Button as CloakButton,
  ButtonProps as CloakButtonProps,
} from '@cloakui/react-primitives';
import {
  buttonStyles as baseButtonStyles,
  VariantProps,
  type Compose,
} from '@cloakui/styles';
import React from 'react';

export const buttonStyles = compose(
  baseButtonStyles,
  cva({
    variants: {
      variant: {
        default: 'highlight-root/20',
      },
    },
  })
);

export type ButtonProps = Omit<CloakButtonProps, 'variants'> & {
  variants?: VariantProps<typeof buttonStyles>;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variants, className, ...props }, ref) => (
    <CloakButton
      ref={ref}
      className={cx(buttonStyles(variants), className)}
      {...props}
    />
  )
);
