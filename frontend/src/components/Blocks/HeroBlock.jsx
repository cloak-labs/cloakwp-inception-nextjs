import { Hero } from '@/components/Hero';
import { useBlockStyleBuilder } from 'cloakwp/dist';

export function HeroBlock({ block }) {
  const { backgroundColor } = block.attrs;
  const { styles } = useBlockStyleBuilder(block);
  return <Hero styles={styles} data={{ ...block.data, backgroundColor }} />;
}
