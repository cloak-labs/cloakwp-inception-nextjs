import { Link } from '@/components/Link';
import classNames from '@/utils/classNames';
import { useGlobals } from 'cloakwp';

export function NavLinks({ links }) {
  const { pageData } = useGlobals();

  return links?.map(({ title, url, id }) => {
    const isCurrentPage = pageData?.pathname == url;
    return (
      <Link
        key={id}
        href={url}
        className={classNames(
          'relative -mx-3 -my-2 rounded-full px-3 py-1 text-base 2xl:text-lg transition-colors delay-150 hover:bg-gray-900 hover:text-gray-100 hover:delay-[0ms]',
          isCurrentPage ? 'font-semibold text-gray-800' : 'text-gray-600'
        )}
      >
        {title}
      </Link>
    );
  });
}
