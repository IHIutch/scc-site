import Markdoc from '@markdoc/markdoc'

export function parseMarkdown(markdownContent: string) {
  const ast = Markdoc.parse(markdownContent)
  return Markdoc.transform(ast, {
    nodes: {
      image: {
        transform(node) {
          return new Markdoc.Tag('Image', { ...node.attributes }, [])
        },
      },
      link: {
        attributes: {
          ...Markdoc.nodes.link.attributes,
          target: { type: String },
          rel: { type: String },
          pathname: { type: String },
        },
        transform(node, config) {
          const children = node.transformChildren(config)

          const url = new URL(node.attributes.href)

          if (
            url.host.startsWith('sccoalition.net')
            || url.host.startsWith('www.sccoalition.net')
          ) {
            return new Markdoc.Tag(
              'InternalLink',
              { ...node.attributes, pathname: url.pathname },
              children,
            )
          }
          else {
            return new Markdoc.Tag(
              'ExternalLink',
              { ...node.attributes, pathname: url.pathname },
              children,
            )
          }
        },
      },
    },
  })
}
