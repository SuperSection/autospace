import type { Config } from 'tailwindcss';
import baseConfig from '@autospace/ui/tailwind.config';

export default {
  presets: [baseConfig],
  content: ['./src/**/*.{ts,tsx}', '../../libs/ui/**/*.{ts,tsx}'],
} satisfies Config;
