import {
  type GenericCardGridProps,
  type GenericCardProps,
} from '@/components/Cards';
import { stripHtml } from '@cloakui/utils';
import type { WPDataRouterReact } from '@cloakwp/react';
import { wpBlockStyleBuilder } from 'cloakwp';

export const cardsDataRouter: WPDataRouterReact<GenericCardGridProps> = (
  block
): GenericCardGridProps => {
  const { classes, styles } = wpBlockStyleBuilder(block);
  const { num_columns, cta_strategy, shared_cta, cards } = block.data;

  const formattedCards =
    cards?.map(({ is_page, card_data, page, individual_cta }) => {
      if (is_page) {
        // auto-populate card with seleced page's data:
        return {
          image: page.featured_image,
          href: page.pathname || `/${page.slug || page.post_name}`,
          title: page.post_title,
          description: stripHtml(page.post_excerpt),
          cta:
            cta_strategy == 'shared'
              ? shared_cta
              : cta_strategy == 'individual'
              ? individual_cta
              : null,
        } as GenericCardProps;
      } else {
        // card data was manually entered:
        return {
          image: card_data.image,
          href: card_data.link.url,
          title: card_data.title,
          description: card_data.excerpt,
          cta:
            cta_strategy == 'shared'
              ? shared_cta
              : cta_strategy == 'individual'
              ? card_data.individual_cta
              : null,
        } as GenericCardProps;
      }
    }) ?? [];

  return {
    cta: shared_cta,
    variants: { cols: parseInt(num_columns) as 2 | 3 },
    cards: formattedCards,
    className: classes,
    style: styles,
  };
};
