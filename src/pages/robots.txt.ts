import type { APIRoute } from 'astro';
import { siteUrl } from '../data/site-config.mjs';

export const prerender = true;

export const GET: APIRoute = () => new Response(
  `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', siteUrl).href}\n`,
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
