import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cx } from '@/lib/utils/cva';

type AccordionContentPrimitiveProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
>;
type AccordionContentProps = AccordionContentPrimitiveProps & {
  isOpen?: boolean;
};

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, isOpen, forceMount, ...props }, ref) => {
  /**
   * AccordionContent is SEO-friendly when `forceMount` is true, however, we lose the
   * nice animations because RadixUI no longer tracks/sets the content height. The
   * following refs + the style prop on `AccordionPrimitive.Content` fixes this.
   */
  const contentRef = React.useRef(null);
  const heightRef = React.useRef(0);
  const height = heightRef.current;

  React.useLayoutEffect(() => {
    if (!forceMount) return;

    const node = contentRef.current;
    if (node && isOpen) {
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
    }
  }, [forceMount, isOpen]);

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-base/normal text-root-dim data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      forceMount={forceMount}
      {...props}
      style={{
        [`--radix-accordion-content-height` as any]: forceMount
          ? height
            ? `${height}px`
            : undefined
          : 'var(--radix-collapsible-content-height)',
        ...props.style,
      }}
    >
      <div ref={contentRef} className={cx('pb-4 pt-0', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
