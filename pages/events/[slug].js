import React from 'react'
import { getEvent, getEvents } from '@/utils/axios/events'

export default function EventsPost({ post }) {
  return <div>{JSON.stringify(post)}</div>
}

export async function getStaticPaths() {
  const { data } = await getEvents()

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
  const { data } = await getEvents()
  const foundPost = data.find((post) => post.attributes.slug === params.slug)
  const {
    data: { attributes: post },
  } = await getEvent(foundPost.id)

  return {
    props: {
      post,
    },
  }
}
