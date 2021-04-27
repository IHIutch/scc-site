module.exports = {
  siteMetadata: {
    title: 'Parks Not Highways',
    siteUrl: `https://parksnothighways.com`,
    titleTemplate: '%s · Parks Not Highways',
    description:
      'Our community vision for a revitalized Scajaquada Creek, a connected Delaware Park, and a restored Humboldt Parkway.',
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gatsby API',
        short_name: 'Gatsby',
        start_url: '/',
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: './src/content/',
      },
      __key: 'content',
    },
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        isResettingCSS: true,
        isUsingColorMode: false,
      },
    },
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        siteId: 'BFWJFNRB',
      },
    },
  ],
}
