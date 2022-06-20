import { getEvents } from '@/utils/axios/events'
import { getPosts } from '@/utils/axios/posts'

export default async function handler(req, res) {
  const { secret, slug, type } = req.query

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== process.env.STRAPI_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  let foundPost,
    allPosts = null

  if (type === 'blog') {
    const { data } = await getPosts({
      publicationState: 'preview',
    })
    allPosts = data
  } else if (type === 'event') {
    const { data } = await getEvents({
      publicationState: 'preview',
    })
    allPosts = data
  } else {
    return res.status(400).json({ message: 'Invalid type' })
  }

  foundPost = allPosts.find((post) => post.attributes.slug === slug)

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!foundPost) {
    return res.status(400).json({ message: 'Invalid slug' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(`/${type}/${slug}`)
}
