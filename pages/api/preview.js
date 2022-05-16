import { getPosts } from '@/utils/axios/posts'

export default async function handler(req, res) {
  const { secret, slug } = req.query

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  // if (secret !== process.env.SECRET_TOKEN) {
  //   return res.status(401).json({ message: 'Invalid token' })
  // }

  const { data } = await getPosts({
    publicationState: 'preview',
  })
  const foundPost = data.find((post) => post.attributes.slug === slug)

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!foundPost) {
    return res.status(400).json({ message: 'Invalid slug' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(`/blog/${foundPost.attributes.slug}`)
}

export async function getStaticProps(context) {
  // If context.preview is true, append "/preview" to the API endpoint
  // to request draft data instead of published data. This will vary
  // based on which headless CMS you're using.
  const res = await fetch(`https://.../${context.preview ? 'preview' : ''}`)
  // ...
}
