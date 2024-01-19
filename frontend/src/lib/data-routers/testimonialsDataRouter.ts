import { TestimonialGridProps } from '@/components/Testimonial/TestimonialGrid';
import { DataRouter, wpBlockStyleBuilder } from 'cloakwp';

export const testimonialsDataRouter: DataRouter<TestimonialGridProps> = (
  block
): TestimonialGridProps => {
  const { classes, styles } = wpBlockStyleBuilder(block);
  const {
    data: { display_type, testimonials },
    attrs: { backgroundColor = '' } = {},
  } = block;

  // when the background is dark, we apply the "dark" theme to the testimonial's foreground content only (i.e. make text light)
  const testimonialClasses = backgroundColor == 'bg-root-invert' ? 'dark' : '';

  if (!testimonials)
    console.error(
      'Zero testimonials were provided via block data, so nothing will render.'
    );

  const formattedTestimonials = testimonials?.map(
    ({ id, title, content, image, acf: { company, position } }) => ({
      id,
      body: content,
      person: {
        name: title,
        company,
        position,
        image: { src: image?.medium, alt: image?.alt },
      },
      className: testimonialClasses,
    })
  );

  let result: TestimonialGridProps = {
    testimonials: formattedTestimonials,
    className: classes,
    style: styles,
  };

  // if (display_type == 'grid') {
  //   result['masonry'] = false;
  // } else
  if (display_type == 'masonry') {
    result['variants'] = { type: 'masonry' };
  }

  return result;
};
