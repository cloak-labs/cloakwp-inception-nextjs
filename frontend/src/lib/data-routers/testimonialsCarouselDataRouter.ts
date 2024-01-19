import { type TestimonialCarouselProps } from '@/components/Testimonial/TestimonialCarousel';
import { DataRouter } from 'cloakwp';
import { testimonialsDataRouter } from './testimonialsDataRouter';
import Autoplay from 'embla-carousel-autoplay';

export const testimonialsCarouselDataRouter: DataRouter<
  TestimonialCarouselProps
> = (block): TestimonialCarouselProps => {
  const {
    data: {
      carousel_options: {
        slides_in_view = 1,
        loop = false,
        blend = true,
        autoplay = false,
        interval = 4,
      } = {},
    },
  } = block;

  const defaultProps = testimonialsDataRouter(block);

  let props = {
    ...defaultProps,
    carouselProps: {
      opts: {
        loop,
      },
      blendSlides: blend,
      plugins: [],
    },
    numVisible: slides_in_view,
  };

  if (autoplay)
    props.carouselProps.plugins.push(
      Autoplay({
        stopOnMouseEnter: true,
        stopOnInteraction: false,
        delay: (interval || 4) * 1000,
      })
    );

  return props;
};
