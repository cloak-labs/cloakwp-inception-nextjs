import type { WPDataRouterReact } from '@cloakwp/react';
import { wpBlockStyleBuilder } from 'cloakwp';
import { ReactStyleProps } from '@cloakui/react-primitives';

export const genericStylesDataRouter: WPDataRouterReact<ReactStyleProps> = (
  block
): ReactStyleProps => {
  const { classes, styles } = wpBlockStyleBuilder(block);

  return {
    className: classes,
    style: styles,
  };
};
