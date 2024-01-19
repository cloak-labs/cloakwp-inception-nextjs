import { defineConfig } from 'cva';
import { extendTailwindMerge } from 'tailwind-merge';
import { withExtendedShadows } from 'tailwind-extended-shadows';
import { Compose } from '@cloakui/styles';

const twMerge = extendTailwindMerge(withExtendedShadows);

const {
  cva,
  cx,
  compose: cvaCompose,
} = defineConfig({
  hooks: {
    onComplete: (className) => twMerge(className),
  },
});

const compose = cvaCompose as Compose; // fix type until we wait for CVA to publish fix: https://github.com/joe-bell/cva/issues/256

export { cva, cx, compose };
