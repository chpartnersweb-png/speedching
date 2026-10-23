// @ts-check
import { defineConfig } from 'astro/config';
import { siteUrl } from './src/data/site-config.mjs';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: 'static',
});
