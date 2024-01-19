import { type FC } from 'react';
import { type ReactGenericParentComponent } from '@cloakui/react-primitives';
import { cx } from '@/lib/utils/cva';

export const HeroContainer: FC<ReactGenericParentComponent> = ({
  className,
  children,
  ...props
}) => {
  return (
    <section
      id="hero"
      className={cx(
        'relative overflow-hidden border-b border-root-dim bg-root',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
