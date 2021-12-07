import React from 'react'
import { getPost, getPosts } from '@/utils/axios/posts'

export default function BlogPost({ post }) {
  return <div>{JSON.stringify(post)}</div>
}

export async function getStaticPaths() {
  const { data } = await getPosts()

  const paths = data.map((post) => ({
    params: {
      slug: post.attributes.slug,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const { data } = await getPosts()
  const foundPost = data.find((post) => post.attributes.slug === params.slug)
  const {
    data: { attributes: post },
  } = await getPost(foundPost.id)

  return {
    props: {
      post,
    },
  }
}
