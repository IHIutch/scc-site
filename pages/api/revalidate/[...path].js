const handler = async (req, res) => {
  const {
    method,
    query: { secret, path },
  } = req

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.SECRET_TOKEN) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  switch (method) {
    // Get
    case 'GET':
      try {
        await res.unstable_revalidate('/' + path.join('/'))

        // Update blog archive page if a blog is updated
        if (path.includes('blog')) {
          await res.unstable_revalidate('/blog')
        }

        // Update event archive page if an event is updated
        if (path.includes('events')) {
          await res.unstable_revalidate('/events')
        }

        return res.json({ revalidated: true })
      } catch (error) {
        return res
          .status(500)
          .json({ error: `Error revalidating: ${error.message}` })
      }

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler
