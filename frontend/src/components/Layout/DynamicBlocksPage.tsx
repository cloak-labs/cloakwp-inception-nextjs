import { wp } from '@/lib/utils/wp';

export default function DynamicBlocksPage({ pageData }) {
  return wp.blockRenderer.render(pageData?.blocks_data);
}
