import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { withEmotionCache } from '@emotion/react'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import Footer from '~/components/footer'
import { useContext, useEffect } from 'react'
import { ClientStyleContext, ServerStyleContext } from '~/context'
import customTheme from 'customTheme'
import CrimsonPro400 from '@fontsource/crimson-pro/400.css'
import CrimsonPro500 from '@fontsource/crimson-pro/500.css'
import CrimsonPro600 from '@fontsource/crimson-pro/600.css'
import CrimsonPro700 from '@fontsource/crimson-pro/700.css'
import CrimsonPro800 from '@fontsource/crimson-pro/800.css'

export const loader = () => {
  return json({
    SITE_META: {
      title: 'Scajaquada Corridor Coalition',
      siteUrl: process.env.SITE_URL,
      titleTemplate: ' · Scajaquada Corridor Coalition',
      description:
        'Our community vision for a revitalized Scajaquada Creek, a connected Delaware Park, and a restored Humboldt Parkway.',
      image: '/assets/images/meta-image.jpg',
      twitterUrl: 'https://twitter.com/RightSize198',
      facebookUrl: 'https://www.facebook.com/sccbuffalo/',
    },
  })
}

export const meta = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

export const links = () => [
  {
    rel: 'stylesheet',
    href: CrimsonPro400,
  },
  {
    rel: 'stylesheet',
    href: CrimsonPro500,
  },
  {
    rel: 'stylesheet',
    href: CrimsonPro600,
  },
  {
    rel: 'stylesheet',
    href: CrimsonPro700,
  },
  {
    rel: 'stylesheet',
    href: CrimsonPro800,
  },
]

const Document = withEmotionCache(({ children }, emotionCache) => {
  const serverStyleData = useContext(ServerStyleContext)
  const clientStyleData = useContext(ClientStyleContext)

  // Only executed on client
  useEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head
    // re-inject tags
    const tags = emotionCache.sheet.tags
    emotionCache.sheet.flush()
    tags.forEach((tag) => {
      emotionCache.sheet._insertTag(tag)
    })
    // reset cache to reapply global styles
    clientStyleData?.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {serverStyleData?.map(({ key, ids, css }) => (
          <style
            key={key}
            data-emotion={`${key} ${ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        ))}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
})

export default function App() {
  const theme = extendTheme(customTheme)

  return (
    <Document>
      <ChakraProvider theme={theme}>
        <Outlet />
        <Footer />
      </ChakraProvider>
    </Document>
  )
}
