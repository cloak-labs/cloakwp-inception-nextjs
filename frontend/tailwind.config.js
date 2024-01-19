const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette');
const svgToDataUri = require('mini-svg-data-uri');
const { theme } = require('./theme.ts');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // Below: hacky way of including Tailwind classes used within CloakWP and CloakUI packages into our project build
    './node_modules/@cloakwp/{blocks-react,blocks-nextjs,react}/dist/{components,data-routers}/**/*.js',
    './node_modules/@cloakwp/block-data-routers/dist/data-routers/**/*.js',
    './node_modules/cloakwp/dist/wpBlockStyleBuilder.js',
    './node_modules/@cloakui/{react,nextjs}-primitives/dist/components/**/*.js',
    './node_modules/@cloakui/styles/dist/**/*.js',
  ],
  safelist: [
    // this safelist ensures certain classes are ALWAYS included in the final tailwind build, which helps ensure dynamic CMS block styling works as intended.
    {
      pattern: /(bg|text)-(root|primary)/,
      variants: ['hover', 'dark'],
    },
    {
      pattern: /(text)-(root)-(vivid|dim|muted|invert)/,
      variants: ['hover', 'dark'],
    },
    {
      pattern: /(bg)-(root)-(dim|invert)/,
      variants: ['hover', 'dark'],
    },
    {
      pattern: /(border)-(root)-(dim|muted)/,
      variants: ['hover', 'dark'],
    },
    'text-link',
    'dark:text-link',
    'ring-focus',
    {
      pattern: /col-span-([1-9]|1[0-2])/, // matches 1 through 12
    },
    {
      pattern: /grid-cols-([1-9]|1[0-2])/, // matches 1 through 12
      variants: ['sm'], // also include `sm:` breakpoint variants
    },
    {
      // safelist `grid` and `hidden` classes with multiple breakpoints (for MasonryGrid component):
      pattern: /(grid|hidden)/,
      variants: ['sm', 'md', 'xmd', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /text-(left|right|center)/,
    },
    {
      pattern:
        /(m|p)(t|b|r|l)?-(0|1|1.5|2|2.5|3|3.5|4|6|8|10|12|16|20|24|32|40)/, // include lots of margin/padding options
    },
  ],
  darkMode: 'class',
  theme: {
    screens: {
      // we add 'xs' and 'xmd' breakpoints alongside the Tailwind defaults (order matters which is why 'xmd' is placed where it is)
      xs: '475px',
      sm: defaultTheme.screens.sm,
      md: defaultTheme.screens.md,
      xmd: '940px',
      lg: defaultTheme.screens.lg,
      xl: defaultTheme.screens.xl,
      '2xl': defaultTheme.screens['2xl'],
    },
    fontSize: {
      // these sizes match the Tailwind defaults, except for the addition of `md` -- we include these re-declared defaults here simply to make it easier to tweak the default sizes/line-heights should you want to
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['0.95rem', { lineHeight: '1.5rem' }], // default: 1rem
      md: ['1.05rem', { lineHeight: '1.75rem' }], // custom
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
        xs: 'calc(var(--radius) - 6px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      },
      lineHeight: {
        tightest: '1.1',
      },
      listStyleType: {
        circle: 'circle',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('tailwind-scrollbar'),
    require('tailwind-extended-shadows'),
    theme.create(),
    /**
     * This plugin provides a `highlight` class, used with backgroundColors (eg. highlight-root-invert/20),
     * to achieve a subtle 3D effect on cards/buttons (most appropriate for dark mode).
     */
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          highlight: (value) => ({
            '--tw-inset-shadow': 'inset 0 1px 0 0 ' + value,
          }),
        },
        {
          values: flattenColorPalette(theme('backgroundColor')),
          type: ['color'],
        }
      );
    }),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'fx-bg-dot': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      );
    }),
  ],
};
