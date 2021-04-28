module.exports = {
  siteMetadata: {
    title: 'Scajaquada Corridor Coalition',
    siteUrl: `https://sccoalition.net`,
    titleTemplate: '%s · Scajaquada Corridor Coalition',
    description:
      'Our community vision for a revitalized Scajaquada Creek, a connected Delaware Park, and a restored Humboldt Parkway.',
    image: 'images/meta-image.jpg',
    twitterUrl: 'https://twitter.com/RightSize198',
    facebookUrl: 'https://www.facebook.com/sccbuffalo/',
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-mdx',
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
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
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
  ],
}
