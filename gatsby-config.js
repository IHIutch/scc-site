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
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL:
          process.env.NODE_ENV === 'production'
            ? 'https://scc-cms.herokuapp.com'
            : 'http://localhost:1337',
        collectionTypes: ['post', 'event'],
        // gatsbyRemarkPlugins: [
        //   {
        //     resolve: 'gatsby-remark-images',
        //   },
        //   {
        //     resolve: 'gatsby-remark-external-links',
        //     options: {
        //       target: '_blank',
        //     },
        //   },
        // ],
      },
    },
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
    'gatsby-plugin-meta-redirect',
  ],
}
