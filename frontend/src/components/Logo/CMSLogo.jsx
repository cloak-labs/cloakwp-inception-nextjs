import { useGlobals } from 'cloakwp'
import { Logo } from '@/components/Logo';
import Image from 'next/future/image'
import classNames from '@/utils/classNames';


export default function CMSLogo({ className, imgClassName, onDark = false, ...props }) {
  const { options } = useGlobals()
  const logo = onDark ? options?.logo_on_dark : options?.logo
  return (
    <>
      {logo?.url ? (
        <div className={classNames('relative min-w-[200px] w-auto h-7 sm:h-8', className)}>
          <Image
            src={logo.url}
            alt={logo.alt}
            fill
            className={classNames('object-contain object-left', imgClassName)}
            {...props}
          />
        </div>
      ) : (
        <Logo onDark={onDark} />
      )}
    </>
  )
}
