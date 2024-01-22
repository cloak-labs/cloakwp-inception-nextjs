import { type FC } from 'react';
import { type ReactStyleProps } from '@cloakui/react-primitives';
import { HeroContainer } from './parts/HeroContainer';
import { HeroContent, type HeroContentProps } from './parts/HeroContent';
import { cx } from '@/lib/utils/cva';
import { ContainerVariants, container } from '@/lib/styles/container';
import { VignetteOverlay } from '../Effects/VignetteOverlay';

export type HeroProps = ReactStyleProps & {
  content: HeroContentProps;
  contentWidth?: ContainerVariants['width'];
};

export const Hero: FC<HeroProps> = ({
  className,
  contentWidth = 'wide',
  content,
  ...props
}) => {
  return (
    <HeroContainer
      {...props}
      className={cx(
        'py-20 fx-bg-dot-black/20 dark:fx-bg-dot-white/15',
        className
      )}
    >
      <VignetteOverlay />
      <HeroContent
        {...content}
        className={cx(container({ width: contentWidth }), content.className)}
      />
    </HeroContainer>
  );
};
