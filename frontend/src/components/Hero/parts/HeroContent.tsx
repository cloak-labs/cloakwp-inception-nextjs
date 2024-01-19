import type { FC } from 'react';
import { Eyebrow } from '@/components/Typography/Eyebrow';
import { TypographyH1, type ReactStyleProps } from '@cloakui/react-primitives';
import { Link } from '@cloakui/nextjs-primitives';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { cx } from '@/lib/utils/cva';
import { Button } from '@/components/UI/Button';

export type HeroContentProps = {
  h1: string;
  eyebrow?: string;
  subtitle?: string;
  cta?: {
    url: string;
    title: string;
  };
  centered?: boolean;
  className?: string;
};

export const HeroContent: FC<HeroContentProps & ReactStyleProps> = ({
  eyebrow,
  h1,
  subtitle,
  cta,
  centered,
  className,
  style,
}) => {
  return (
    <div
      className={cx(
        'relative z-10 flex h-full w-full flex-col justify-center',
        centered && 'text-center sm:items-center',
        className
      )}
      style={style}
    >
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      {h1 && (
        <TypographyH1 className="max-w-xl text-root xl:max-w-2xl">
          {h1}
        </TypographyH1>
      )}
      {subtitle && (
        <p className="mt-3 max-w-xl text-balance text-base leading-6 text-root-dim md:mt-5 md:leading-7 xl:max-w-2xl">
          {subtitle}
        </p>
      )}
      {cta && cta.url && cta.title && (
        <Button
          asChild
          variants={{ variant: 'default' }}
          className="mt-6 max-w-fit 2xl:mt-8"
        >
          <Link href={cta.url}>
            {cta.title}
            <ArrowRightIcon className="ml-2 size-4" />
          </Link>
        </Button>
      )}
    </div>
  );
};
