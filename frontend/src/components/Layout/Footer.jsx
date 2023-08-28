import { Link } from '@/components/Link';
import { Container } from '@/components/Layout';
import { metaConfig } from '@/config/metaConfig';
import { Logo } from '@/components/Logo';
import { Facebook, Instagram, Twitter } from '@/components/Icons/Social';
import CMSLogo from '../Logo/CMSLogo';
import { useGlobals } from 'cloakwp';
import parse from 'html-react-parser'

const content = {
    social: [
      {
        Icon: Facebook,
        href: metaConfig.links.social.facebook
      },
      {
        Icon: Instagram,
        href: metaConfig.links.social.instagram
      },
      {
        Icon: Twitter,
        href: metaConfig.links.social.twitter
      },
    ],
    copyright: `${new Date().getFullYear()} ${metaConfig.companyName}. All rights reserved.`
}

export function Footer() {
  const { options, navBarData } = useGlobals()

  return (
    <footer className='bg-gray-900 text-gray-200 py-14'>
      <Container>
        <div className='flex flex-col items-center justify-center my-4 px-6'>
          <div className='flex flex-col gap-y-3'>
            <Link href='/'>
              <CMSLogo onDark imgClassName="object-center" />
            </Link>
            {options?.tagline && <span className='text-gray-300 text-sm text-center'>{parse(options.tagline)}</span>}
          </div>
          <div className='flex-col text-center sm:flex-row flex flex-wrap justify-center gap-x-10 gap-y-3 my-10'>
            {navBarData?.menu_items?.slice(0,-1).map(( {title, url}, index ) => (
              <Link href={url} key={index}>
                <p className='uppercase text-base hover:text-white'>
                  {title}
                </p>
              </Link>
            ))}
          </div>
          <div className='flex justify-between gap-6 mt-2'>
            {
              content.social.map( ({Icon, href}, index) => (
                <Link href={href} key={index}>
                  <Icon className="text-gray-200 hover:text-blue-200" />
                  {/* <Image width={25} height={25} src={icon} className='w-7 h-7'/> */}
                </Link>
              ))
            }
          </div>
          <p className='mt-6 text-sm text-center text-gray-400'>
            &copy; {`${new Date().getFullYear()} ${options.company_name}. All rights reserved.`}
          </p>
        </div>
      </Container>
    </footer>
  )
}
