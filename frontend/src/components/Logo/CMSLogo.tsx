'use client';

import { useGlobals } from '@cloakwp/react';
import { Logo } from '@/components/Logo';
import Image from 'next/image';
import { cx } from '@/lib/utils/cva';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { ReactStyleProps } from '@cloakui/react-primitives';

export type CMSLogoProps = ReactStyleProps & {
  imgClassName?: string;
  onDark?: boolean;
};

export const CMSLogo: React.FC<CMSLogoProps> = ({
  className,
  imgClassName,
  onDark = false,
  ...props
}) => {
  const { options } = useGlobals();
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // we don't render the CMSLogo until mounted due to reliance on knowing the currently active theme, which is always undefined on the server
  if (!mounted) return null;

  const isDark = onDark || resolvedTheme == 'dark';
  const logo = isDark ? options?.logo_on_dark : options?.logo;

  return (
    <>
      {logo?.url ? (
        <div
          className={cx('relative h-7 w-auto min-w-[200px] sm:h-8', className)}
        >
          <Image
            src={logo.url}
            alt={logo.alt}
            fill
            className={cx('object-contain object-left', imgClassName)}
            {...props}
          />
        </div>
      ) : (
        <Logo onDark={isDark} />
      )}
    </>
  );
};
