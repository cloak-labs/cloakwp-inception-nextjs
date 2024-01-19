import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../..//tailwind.config';

const { theme: twTheme } = resolveConfig(tailwindConfig);

export default twTheme;
