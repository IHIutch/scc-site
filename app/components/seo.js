import Head from 'next/head'

export const SEO = ({
  title = '',
  description = process.env.SITE_META.description,
  slug = '',
  image = process.env.SITE_META.siteUrl + process.env.SITE_META.image,
}) => {
  const pageTitle = title
    ? `${title} | ${process.env.SITE_META.title}`
    : process.env.SITE_META.title
  const url = slug
    ? process.env.SITE_META.siteUrl + slug
    : process.env.SITE_META.siteUrl
  // const image =
  //   post?.featuredImage?.data?.attributes?.url ||
  //   process.env.SITE_META.siteUrl + process.env.SITE_META.image

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      {/* {post?.author && (
        <meta name="twitter:creator" content={post?.author.twitter} />
      )} */}
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta
        name="google-site-verification"
        content="4G-BG38xle3j3JMWw4-D7b4gPRj77EMFx-bkjNhyAuM"
      />
    </Head>
  )
}
