import React from 'react'

export default function EventsArchive({ posts }) {
  return <div></div>
}

export async function getStaticProps() {
  return {
    props: {
      posts: [],
    },
    revalidate: 60 * 60 * 24,
  }
}
