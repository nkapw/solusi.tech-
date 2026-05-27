// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://nyiroro.id',
  integrations: [
    sitemap(),
    tailwind({ applyBaseStyles: false }),
  ],
});
