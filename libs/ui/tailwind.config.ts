import type { Config } from 'tailwindcss';
import {
  colorsConfig,
  spacingConfig,
  animationConfig,
  keyframesConfig,
} from './src/types/config';

export default {
  important: true,
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: colorsConfig,

    extend: {
      ringColor: {
        DEFAULT: colorsConfig.primary.DEFAULT,
      },
      outlineColor: {
        DEFAULT: colorsConfig.primary.DEFAULT,
      },
      borderRadius: {
        DEFAULT: '0',
      },
      spacing: spacingConfig,
      animation: animationConfig,
      keyframes: keyframesConfig,
    },
  },
  plugins: [],
} satisfies Config;
