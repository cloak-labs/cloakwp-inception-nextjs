import type { WPDataRouterReact } from '@cloakwp/react';
import { wpBlockStyleBuilder } from 'cloakwp';
import {
  FAQData,
  type FAQAccordionsProps,
} from '@/components/FAQ/FAQAccordions';

export const faqsDataRouter: WPDataRouterReact<FAQAccordionsProps> = (
  block
): FAQAccordionsProps => {
  const { classes, styles } = wpBlockStyleBuilder(block);
  const { faqs, faq_style } = block.data;

  // const formattedFaqs = faqs.map(faq => ({
  //   answer: faq.content
  // } as FAQData));

  return {
    faqs,
    variant: faq_style,
    className: classes,
    style: styles,
  };
};
