import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { sites } from '@openai/sites-vite-plugin';

export default defineConfig({
  site: 'https://mahadi-mehran-legacy.dflores537339.chatgpt.site',
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          bn: 'bn-BD',
        },
      },
      serialize(item) {
        item.changefreq = 'yearly';
        item.lastmod = new Date('2026-08-26T00:00:00.000Z');
        item.priority = item.url.endsWith('/bn/') ? 0.9 : 1;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [sites()],
  },
});
