export const getSEO = ({ title, url, description, image, type }) => ({
  title,
  description,
  image,

  'og:url': url,
  'og:type': 'website',
  'og:title': title,
  'og:description': description,
  'og:image': image,

  'twitter:card': 'summary_large_image',
  'twitter:creator': '@RightSize198',
  'twitter:title': title,
  'twitter:description': description,
  'twitter:image': image,
})
