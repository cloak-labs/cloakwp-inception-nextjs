import classNames from '@/utils/classNames';

export function Container({ className, innerClassName, children, as: Element = 'div', ...props }) {
  const defaultInnerClassNames = 'px-4 sm:px-6 lg:px-9 mx-auto max-w-7xl lg:max-w-8xl'
  const hasBgColor = className?.includes('bg-') || false

  return (
    <Element
      className={classNames(
        !hasBgColor && defaultInnerClassNames,
        !hasBgColor && innerClassName,
        className
      )}
      {...props}
    >
      {hasBgColor ? (
        <div className={classNames(defaultInnerClassNames, innerClassName)}>
          {children}
        </div>
      ) : children
      }
    </Element>
  )
}