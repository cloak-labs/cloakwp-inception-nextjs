import classNames from '@/utils/classNames';

export function Eyebrow({ className, children, ...props }) {
  return (
    <p
      className={classNames(
        'mb-0 min-w-fit text-sm font-semibold uppercase tracking-widest text-blue-700 lg:text-md',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
