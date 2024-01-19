export const REQUIRED_FIELDS = 'id,slug,pathname,_links'; // these are required for CloakWP AdminBar
export const PAGE_FIELDS = REQUIRED_FIELDS + ',title,blocks_data,yoast_head';
export const POST_FIELDS =
  PAGE_FIELDS + ',featured_image.large,featured_image.alt,date,author';
export const POST_CARD_FIELDS =
  REQUIRED_FIELDS +
  ',featured_image.medium,featured_image.alt,title,excerpt,date,author.display_name';
