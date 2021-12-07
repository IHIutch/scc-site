import React from 'react'

export default function EventsPost() {
  return <div></div>
}

export async function getStaticProps({ params }) {
  return {
    props: {
      slug: params.slug,
    },
  }
}
