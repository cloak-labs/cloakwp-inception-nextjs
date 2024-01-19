import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  YouTube,
} from '@/components/Icons/Social';
import { CMSLogo } from '../Logo/CMSLogo';
import { Container, isTag } from '@cloakui/react-primitives';
import { Link } from '@cloakui/nextjs-primitives';
import { useGlobals } from '@cloakwp/react';
import parse, { DOMNode, domToReact } from 'html-react-parser';

export function Footer() {
  const {
    options: {
      company_name,
      tagline,
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
    },
    headerMenuData,
  } = useGlobals();

  const socialLinks = [
    {
      Icon: Facebook,
      href: facebook,
    },
    {
      Icon: Instagram,
      href: instagram,
    },
    {
      Icon: Twitter,
      href: twitter,
    },
    {
      Icon: LinkedIn,
      href: linkedin,
    },
    {
      Icon: YouTube,
      href: youtube,
    },
  ];

  return (
    <Container
      as="footer"
      className="dark flex flex-col items-center justify-center border-t border-root-dim bg-root py-14 text-root-vivid sm:px-6 sm:py-20 2xl:py-24 dark:bg-root-dim"
    >
      <div className="flex flex-col gap-y-3">
        <Link href="/">
          <CMSLogo
            onDark
            imgClassName="object-center"
            className="h-8 sm:h-10"
          />
        </Link>
        {tagline && // tagline comes via REST API as HTML string, so we must parse it:
          parse(tagline, {
            // remove whitespace/new lines:
            trim: true,
            // add tw classes to <p> tag:
            replace: (domNode) => {
              if (isTag(domNode, 'p')) {
                const { children } = domNode;
                if (children) {
                  return (
                    <p className="text-center text-sm text-root xl:text-base">
                      {domToReact(children as DOMNode[])}
                    </p>
                  );
                }
              }
            },
          })}
      </div>
      <div
        className="my-10 flex flex-col flex-wrap justify-center gap-x-10 gap-y-3 text-center sm:flex-row"
        data-theme="dark"
      >
        {headerMenuData?.menu_items
          ?.slice(0, -1)
          .map(({ title, url }, index) => (
            <Link href={url} key={index}>
              <p className="text-base uppercase text-root-muted hover:text-white">
                {title}
              </p>
            </Link>
          ))}
      </div>
      <div className="flex justify-center gap-6">
        {socialLinks
          .filter(({ href }) => href)
          .map(({ Icon, href }, index) => (
            <Link href={href} key={index}>
              <Icon className="text-root-vivid hover:text-link" />
            </Link>
          ))}
      </div>
      <p className="mt-6 text-center text-sm text-root-muted">
        &copy;{' '}
        {`${new Date().getFullYear()} ${company_name}. All rights reserved.`}
      </p>
    </Container>
  );
}
