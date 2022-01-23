import Head from 'next/head'

export const SEO = ({ post }) => {
  const title = post?.title || process.env.SITE_META.title
  const description = post?.description || process.env.SITE_META.description
  const url = new URL(post?.path || '', process.env.SITE_META.siteUrl)
  const image = post?.image
    ? new URL(post?.image, process.env.SITE_META.siteUrl)
    : new URL(process.env.SITE_META.image, process.env.SITE_META.siteUrl)

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
      {post?.author && (
        <meta name="twitter:creator" content={post?.author.twitter} />
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
