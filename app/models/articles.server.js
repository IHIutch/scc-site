import Markdoc, { nodes, Tag } from '@markdoc/markdoc'

export const parseMarkdown = (markdownContent) => {
  const ast = Markdoc.parse(markdownContent)
  return Markdoc.transform(ast, {
    nodes: {
      image: {
        transform(node, config) {
          return new Tag('Image', { ...node.attributes }, [])
        },
      },
      link: {
        attributes: {
          ...nodes.link.attributes,
          target: { type: String },
          rel: { type: String },
          pathname: { type: String },
        },
        transform(node, config) {
          const children = node.transformChildren(config)

          const url = new URL(node.attributes.href)

          if (
            url.host.startsWith('sccoalition.net') ||
            url.host.startsWith('www.sccoalition.net')
          ) {
            return new Tag(
              'InternalLink',
              { ...node.attributes, pathname: url.pathname },
              children
            )
          } else {
            return new Tag(
              'ExternalLink',
              { ...node.attributes, pathname: url.pathname },
              children
            )
          }
        },
      },
    },
  })
}
