/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/@ryanliu6/xi/dist/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'selector',
};
