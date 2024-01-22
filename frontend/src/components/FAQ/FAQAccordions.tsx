import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/UI/Accordion';
import { cx } from '@/lib/utils/cva';
import {
  type AccordionVariants,
  accordionItemStyle,
  accordionStyle,
} from '@/lib/styles/accordion';

export type FAQData = {
  id: string;
  question: string;
  answer: string;
};

export type FAQAccordionsProps = React.ComponentProps<'div'> & {
  faqs: FAQData[];
  variant: AccordionVariants['variant'];
};

export const FAQAccordions: React.FC<FAQAccordionsProps> = ({
  faqs,
  variant,
  className,
}) => {
  // We use state to control Accordion visibility due to `forceMount` (important for SEO) on `AccordionContent`
  const [activeItemId, setActiveItemId] = React.useState('');

  return (
    <Accordion
      type="single"
      collapsible={true}
      value={activeItemId}
      onValueChange={setActiveItemId}
      className={cx(
        'mx-auto w-full max-w-2xl space-y-3',
        accordionStyle({ variant }),
        className
      )}
    >
      {faqs?.map(({ id, question, answer }, i) => {
        const isActive = id === activeItemId;
        return (
          <AccordionItem
            key={i}
            value={id}
            className={accordionItemStyle({ variant })}
          >
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent
              forceMount
              isOpen={isActive}
              style={{
                height: isActive
                  ? 'var(--radix-accordion-content-height)'
                  : '0',
              }}
            >
              {answer}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
