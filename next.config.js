module.exports = {
  reactStrictMode: true,
  env: {
    SITE_META: {
      title: 'Scajaquada Corridor Coalition',
      siteUrl: 'https://sccoalition.net',
      titleTemplate: ' · Scajaquada Corridor Coalition',
      description:
        'Our community vision for a revitalized Scajaquada Creek, a connected Delaware Park, and a restored Humboldt Parkway.',
      image: '/assets/images/meta-image.jpg',
      twitterUrl: 'https://twitter.com/RightSize198',
      facebookUrl: 'https://www.facebook.com/sccbuffalo/',
    },
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap/:path*',
        destination: 'https://scc-strapi.up.railway.app/sitemap/:path*',
      },
    ]
  },
}
