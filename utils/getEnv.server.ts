import process from 'node:process'

export function getEnv() {
  return {
    STRAPI_PREVIEW_SECRET: process.env.STRAPI_PREVIEW_SECRET,
    PUBLIC_STRAPI_API_URL: process.env.PUBLIC_STRAPI_API_URL,
    NODE_ENV: process.env.NODE_ENV,
    SITE_URL: process.env.SITE_URL,
    VERCEL_URL: process.env.VERCEL_URL,
  }
}
