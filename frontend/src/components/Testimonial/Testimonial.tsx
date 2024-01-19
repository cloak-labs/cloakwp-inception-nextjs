import { card } from '@/lib/styles/card';
import { ImageOptions } from '@/lib/types/sharedTypes';
import { ReactStyleProps, TypographyP } from '@cloakui/react-primitives';
import { cx } from '@/lib/utils/cva';
import { FC } from 'react';

export type TestimonialProps = {
  body: string;
  person: {
    image?: ImageOptions;
    name: string;
    company?: string;
    position?: string;
  };
};

export type TestimonialData = TestimonialProps & { id?: string };

export const Testimonial: FC<ReactStyleProps & TestimonialProps> = ({
  body,
  person,
  className,
  ...props
}) => {
  return (
    <figure
      className={cx(card({ padding: 0 }), 'flex flex-col', className)}
      {...props}
    >
      <blockquote className="scrollbar-thumb-root max-h-52 flex-grow scroll-mb-5 overflow-y-auto p-5 text-root scrollbar-thin">
        <TypographyP className="text-base">{`"${body}"`}</TypographyP>
      </blockquote>
      <figcaption className="mb-0 flex items-center gap-x-4 border-t border-root-dim bg-root-dim px-5 py-3">
        {person.image?.src && (
          <img
            className="size-11 rounded-full border border-root bg-root-dim"
            src={person.image.src}
            alt={person.image.alt || `headshot of ${person.name}`}
          />
        )}
        <div>
          {person.name && (
            <div className="mb-0.5 text-base font-medium text-root">
              {person.name}
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-root-muted">
            {person.company && (
              <div className="text-root-dim">{person.company}</div>
            )}
            {person.company && person.position && (
              <div className="text-xs">|</div>
            )}
            {person.position && <div>{person.position}</div>}
          </div>
        </div>
      </figcaption>
    </figure>
  );
};
