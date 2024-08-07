export function getSEO({
  title,
  url,
  description,
  image,
}:
{
  url?: string
  title?: string
  description?: string
  image?: string
}) {
  let seo = {
    'og:url': url,
    'og:type': 'website',

    'twitter:card': 'summary_large_image',
    'twitter:creator': '@RightSize198',
  }

  if (title) {
    seo = {
      ...seo,
      'title': title,
      'og:title': title,
      'twitter:title': title,
    }
  }

  if (description) {
    seo = {
      ...seo,
      description,
      'og:description': description,
      'twitter:description': description,
    }
  }

  if (image) {
    seo = {
      ...seo,
      image,
      'og:image': image,
      'twitter:image': image,
    }
  }

  return seo
}
