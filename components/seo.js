import { siteMeta } from '@/utils/constants'
import Head from 'next/head'

export const SEO = ({ post }) => {
  if (siteMeta.siteUrl === '' && typeof window !== 'undefined') {
    siteMeta.siteUrl = window.location.origin
  }

  if (siteMeta.siteUrl === '') {
    console.error('Please set a siteUrl in your site metadata!')
    return null
  }

  const title = post.title || siteMeta.title
  const description = post.description || siteMeta.description
  const url = new URL(post.path || '', siteMeta.siteUrl)
  const image = post.image
    ? new URL(post.image, siteMeta.siteUrl)
    : new URL(siteMeta.image, siteMeta.siteUrl)

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {image && <meta name="image" content={image} />}

      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      {post.author && (
        <meta name="twitter:creator" content={post.author.twitter} />
      )}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <meta
        name="google-site-verification"
        content="4G-BG38xle3j3JMWw4-D7b4gPRj77EMFx-bkjNhyAuM"
      />
    </Head>
  )
}
