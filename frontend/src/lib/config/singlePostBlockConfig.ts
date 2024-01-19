import { cx } from '@/lib/utils/cva';
import { type BlockRendererConfig } from 'cloakwp';
import {
  imageDataRouter,
  typographyDataRouter,
} from '@cloakwp/block-data-routers';
import { DeepPartial } from 'ts-essentials';

export const singlePostBlockConfig: DeepPartial<BlockRendererConfig> = {
  blocks: {
    'core/heading': {
      variants: {
        h2: {
          dataRouter: (block) => {
            const defaultProps = typographyDataRouter(block);

            return {
              ...defaultProps,
              // apply a bottom border to H2s, unless they're nested (eg. in a column/group/etc.)
              className: cx(
                defaultProps.className,
                block.context.parent ? 'mb-0' : 'border-b pb-2'
              ),
            };
          },
        },
      },
    },
    'core/image': {
      dataRouter: (block) => {
        const defaultProps = imageDataRouter(block);

        return {
          ...defaultProps,
          // add extra bottom margin to root-level images:
          cntrClassName: cx(
            defaultProps.cntrClassName,
            !block.context.parent && 'mb-8'
          ),
        };
      },
    },
  },
};
