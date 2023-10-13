import { Testimonial } from "@/components/Testimonial";
import { useBlockStyleBuilder } from "cloakwp";
import parse from 'html-react-parser';

export function TestimonialBlock({block}) {
  const { classes, styles } = useBlockStyleBuilder(block)
  const { manual_data, testimonial_post, testimonial, name, position } = block.data;

  let testimonialProps = {}
  if(manual_data == '0'){ // ACF relationship field was used
    const data = testimonial_post?.value?.[0]
    testimonialProps = {
      testimonial: parse(data?.post_content) || '',
      name: data?.post_title,
      position: data?.acf?.secondary_text,
      bgColor: block.attrs.backgroundColor
    }
  }else{ // data was manually entered
    testimonialProps = {
      testimonial: (<p>{testimonial}</p>),
      name,
      position,
      bgColor: block.attrs.backgroundColor
    }
  }

  return (
    <div style={styles}>
      <Testimonial
          {...testimonialProps}
          className={classes}
      />
    </div>
  )
}
