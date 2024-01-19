import { Theme } from 'tailwind-easy-theme';

/**
 * * THEME EXPLAINER *
 * We use a CSS variable theming approach, inspired by Shadcn/ui (https://ui.shadcn.com/docs/theming#css-variables). It enables easy
 * toggling of different themes, such as dark mode, without having to add extra CSS classes throughout your markup. It also means using
 * more semantic classes like `bg-primary` vs. `bg-blue-600` -- most Tailwind users are probably used to the latter, but trust us, this
 * approach is better for 99% of marketing/brand websites, and enables quicker client project scaffolding for freelancers/agencies.
 *
 * Unlike Shadcn/ui, we don't manually specify our HSL CSS variables in a separate CSS file and then reference them manually again below
 * in our Tailwind config. Instead, we use the `tailwind-easy-theme` plugin, which has a few benefits:
 *  - it allows us to provide HEX codes and under-the-hood will generate/inject HSL CSS variables into Tailwind's final CSS
 *  - prevents us from having to manually manage the CSS variables within a separate CSS file -- more manageable and readable
 *  - it also sets the HEX values as CSS variable "fallbacks", which enables Tailwind Intellisense/autocomplete to work with all color classes
 */

/**
 * The `brand` colors object serves as a way of labelling HEX color codes so they're easily
 * readable and re-usable throughout the theme objects further below.
 */
const brand = {
  blue: {
    400: '#4C8DFB',
    500: '#2563EB',
    600: '#1D4ED8',
  },
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#B5C2D4',
    400: '#8E9DB4',
    500: '#64748B',
    600: '#364459',
    700: '#1E293B',
    800: '#0F172A',
    900: '#080F20',
    950: '#020817',
  },
  white: '#FFFFFF',
  red: {
    light: '#EF4444',
    dark: '#7F1D1D',
  },
};

const textColors = {
  root: {
    vivid: brand.neutral[950],
    DEFAULT: brand.neutral[800],
    dim: brand.neutral[600],
    muted: brand.neutral[500],
    invert: brand.neutral[200],
  },
  primary: brand.neutral[50],
  link: brand.blue[500],
  destructive: brand.red.light,
};

const bgColors = {
  root: {
    vivid: brand.white, // only useful in dark mode
    DEFAULT: brand.white,
    dim: brand.neutral[100],
    invert: brand.neutral[700],
  },
  primary: brand.blue[500],
  destructive: brand.red.light,
};

const borderColors = {
  root: {
    DEFAULT: brand.neutral[300], // eg. border-root
    dim: brand.neutral[200],
    muted: brand.neutral[100],
    invert: brand.neutral[700],
  },
  focus: brand.blue[500], // eg. ring-focus
};

const theme = new Theme({
  textColor: textColors,
  fill: textColors,
  placeholderColor: textColors,
  backgroundColor: bgColors,
  gradientColorStops: {
    root: { ...bgColors.root },
  },
  borderColor: borderColors,
  ringColor: borderColors,
  divideColor: borderColors,
  outlineColor: borderColors,
  boxShadowColor: {
    root: {
      DEFAULT: brand.neutral[800],
    },
  },
});

// DARK MODE ==========================

const darkTextColors = {
  root: {
    vivid: brand.neutral[50],
    DEFAULT: brand.neutral[200],
    dim: brand.neutral[300],
    muted: brand.neutral[500],
    invert: brand.neutral[700],
  },
  primary: brand.neutral[800],
  link: brand.blue[400],
  destructive: brand.neutral[50],
};

const darkBgColors = {
  root: {
    vivid: brand.neutral[800],
    DEFAULT: brand.neutral[900],
    dim: brand.neutral[950],
    invert: brand.neutral[300],
  },
  primary: brand.blue[400],
  destructive: brand.red.dark,
};

const darkBorderColors = {
  root: {
    DEFAULT: brand.neutral[600],
    dim: brand.neutral[700],
    muted: brand.neutral[800],
    invert: brand.neutral[200],
  },
  focus: brand.blue[400],
};

theme.variant(
  {
    textColor: darkTextColors,
    fill: darkTextColors,
    placeholderColor: darkTextColors,
    backgroundColor: darkBgColors,
    gradientColorStops: {
      root: { ...darkBgColors.root },
    },
    borderColor: darkBorderColors,
    ringColor: darkBorderColors,
    divideColor: darkBorderColors,
    outlineColor: darkBorderColors,
    boxShadowColor: {
      root: {
        DEFAULT: brand.neutral[950],
      },
    },
  },
  {
    selector: '.dark',
    mediaQuery: '@media (prefers-color-scheme: dark)',
  }
);

export { brand, theme };
