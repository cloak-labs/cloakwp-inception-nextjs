import { CardsGrid } from '@/components/Cards';
import { useBlockStyleBuilder } from 'cloakwp';
import formatDate from '@/utils/formatDate';

export function CardsBlock({ block }) {
  const { styles } = useBlockStyleBuilder(block);
  const { num_columns, cta_strategy, shared_cta, cards } = block.data;

  const formattedCards = cards?.map(({ is_page, card_data, page, individual_cta }) => {
    if (is_page) {
      // auto-populate card with seleced page's data:
      return {
        id: page.id,
        imageUrl: page.featured_image,
        href: page.pathname || `/${page.slug || page.post_name}`,
        title: page.post_title,
        description: page.post_excerpt,
        cta: cta_strategy == 'shared_cta' ? shared_cta : cta_strategy == 'individual_cta' ? individual_cta : null
      };
    } else {
      // card data was manually entered:
      return {
        id: card_data.title,
        imageUrl: card_data.image.src,
        href: card_data.link.url,
        title: card_data.title,
        description: card_data.excerpt,
        cta: cta_strategy == 'shared_cta' ? shared_cta : cta_strategy == 'individual_cta' ? card_data.individual_cta : null,
      };
    }
  }) ?? [];

  return (
    <CardsGrid
      cta={shared_cta}
      cols={num_columns}
      cards={formattedCards}
      limit={formattedCards?.length}
      bgColor={block.attrs.backgroundColor}
      style={styles}
    />
  );
}
