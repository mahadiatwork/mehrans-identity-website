import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://md-mehran-hasan-turaj.vercel.app',
  output: 'server',
  adapter: vercel(),
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
});
