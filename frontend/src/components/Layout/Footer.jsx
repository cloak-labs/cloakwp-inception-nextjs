import { Link } from '@/components/Link';
import { Container } from '@/components/Layout';
import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  YouTube,
} from '@/components/Icons/Social';
import CMSLogo from '../Logo/CMSLogo';
import { useGlobals } from 'cloakwp';
import parse from 'html-react-parser';

export function Footer() {
  const {
    options: { company_name, tagline, facebook, instagram, twitter, linkedin, youtube },
    navBarData,
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
      className="flex flex-col items-center justify-center bg-gray-900 py-14 text-gray-200 sm:px-6 sm:py-20 2xl:py-24"
    >
      <div className="flex flex-col gap-y-3">
        <Link href="/">
          <CMSLogo
            onDark
            imgClassName="object-center"
            className="h-8 sm:h-10"
          />
        </Link>
        {tagline && (
          <span className="text-center text-sm text-gray-300 xl:text-base">
            {parse(tagline)}
          </span>
        )}
      </div>
      <div className="my-10 flex flex-col flex-wrap justify-center gap-x-10 gap-y-3 text-center sm:flex-row">
        {navBarData?.menu_items?.slice(0, -1).map(({ title, url }, index) => (
          <Link href={url} key={index}>
            <p className="text-base uppercase hover:text-white">{title}</p>
          </Link>
        ))}
      </div>
      <div className="flex justify-center gap-6">
        {socialLinks.filter(({ href }) => href).map(({ Icon, href }, index) => (
          <Link href={href} key={index}>
            <Icon className="text-gray-200 hover:text-blue-200" />
          </Link>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-gray-400">
        &copy;{' '}
        {`${new Date().getFullYear()} ${
          company_name
        }. All rights reserved.`}
      </p>
    </Container>
  );
}
