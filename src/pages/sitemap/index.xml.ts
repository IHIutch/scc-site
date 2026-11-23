import type { APIRoute } from 'astro';

// Preserve the original sitemap location. EmDash maintains the current sitemap.
export const GET: APIRoute = ({ redirect }) => redirect('/sitemap.xml', 301);
