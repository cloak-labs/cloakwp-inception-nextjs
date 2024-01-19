import { heroDataRouter } from './heroDataRouter';
import type { WPDataRouterReact } from '@cloakwp/react';
import type { HeroWithImageProps } from '@/components/Hero/HeroWithBgImage';

export const heroWithImageDataRouter: WPDataRouterReact<HeroWithImageProps> = (
  block
): HeroWithImageProps => {
  const defaultProps = heroDataRouter(block);

  return {
    ...defaultProps,
    image: block.data.image,
  };
};
