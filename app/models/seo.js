export const getSEO = ({
  title = 'Scajaquada Corridor Coalition',
  url = '',
  description = 'Our community vision for a revitalized Scajaquada Creek, a connected Delaware Park, and a restored Humboldt Parkway.',
  image = '/assets/images/meta-image.jpg',
  type = 'website',
}) => ({
  title,
  description,
  image,

  'og:url': url,
  'og:type': type,
  'og:title': title,
  'og:description': description,
  'og:image': image,

  'twitter:card': 'summary_large_image',
  'twitter:creator': '@RightSize198',
  'twitter:title': title,
  'twitter:description': description,
  'twitter:image': image,
})
