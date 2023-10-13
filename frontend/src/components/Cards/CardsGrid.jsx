import { Card } from '@/components/Cards';
import classNames from '@/utils/classNames';

export function CardsGrid({
  cards, // array of post data
  cta, // optional cta text to use on all cards
  limit = 3, // the maximum amount of cards to render
  cols = 3, // choose between 2 and 3 column layout
  bgColor,
  style,
  className = '',
  cardComponent: CardComponent = Card,
  cardProps = {},
}) {
  return (
    <div
      className={classNames(
        'relative z-10 mx-auto grid max-w-sm gap-5 sm:max-w-none',
        cols == 3 && 'sm:grid-cols-2 xmd:grid-cols-3',
        cols == 2 && 'md:grid-cols-2',
        className
      )}
      style={style}
    >
      {cards?.slice(0, Math.min(limit, cards.length))?.map((card, i) => (
        <CardComponent
          key={card.id || i}
          image={card.imageUrl || '/images/placeholder.png'}
          href={card.href}
          title={card.title}
          {...(card.cta ? { cta: card.cta } : cta ? { cta } : {})}
          description={card.description}
          backgroundColor={bgColor}
          data={card}
          {...cardProps}
        />
      ))}
    </div>
  );
}
