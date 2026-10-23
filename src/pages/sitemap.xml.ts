import type { APIRoute } from 'astro';
import { siteUrl } from '../data/site-config.mjs';

export const prerender = true;

// This LP has one document. Section anchors are not separate indexed pages.
export const GET: APIRoute = () => new Response(
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}</loc></url>\n</urlset>\n`,
  { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
);
