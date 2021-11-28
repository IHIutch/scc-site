import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ post }) => {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          siteUrl
          image
        }
      }
    }
  `)

  const defaults = site.siteMetadata

  if (defaults.siteUrl === '' && typeof window !== 'undefined') {
    defaults.siteUrl = window.location.origin
  }

  if (defaults.siteUrl === '') {
    console.error('Please set a siteUrl in your site metadata!')
    return null
  }

  const title = post?.title || defaults.title
  const description = post?.description || defaults.description
  const url = new URL(post?.path || '', defaults.siteUrl)
  const image = post?.image
    ? new URL(post.image, defaults.siteUrl)
    : new URL(defaults.image, defaults.siteUrl)

  return (
    <Helmet
      title={title}
      titleTemplate={!post?.isHome ? defaults.titleTemplate : '%s'}
    >
      <meta name="description" content={description} />
      {image && <meta name="image" content={image} />}

      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      {post?.author && (
        <meta name="twitter:creator" content={post.author.twitter} />
      )}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}

export default SEO
