import type { HeroProps } from '@/components/Hero/Hero';
import { cx } from '@/lib/utils/cva';
import type { WPDataRouterReact } from '@cloakwp/react';
import { wpBlockStyleBuilder } from 'cloakwp';

export const heroDataRouter: WPDataRouterReact<HeroProps> = (
  block
): HeroProps => {
  const { classes, styles } = wpBlockStyleBuilder(block);
  const {
    attrs: { backgroundColor } = {},
    data: {
      content_alignment,
      inner_content_width,
      h1,
      eyebrow,
      subtitle,
      cta_button,
    } = {},
  } = block;

  // when the background is dark, we apply the "dark" theme to the Hero's inner content only (i.e. make text/buttons light)
  const contentClasses = backgroundColor == 'bg-root-invert' ? 'dark' : '';

  return {
    style: styles,
    className: cx(classes, backgroundColor),
    contentWidth: inner_content_width,
    content: {
      centered: content_alignment == 'center',
      eyebrow,
      h1,
      subtitle,
      cta: cta_button,
      className: contentClasses,
    },
  };
};
