import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { withEmotionCache } from '@emotion/react'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { useContext, useEffect } from 'react'
import customTheme from 'customTheme'
import type { MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { getEnv } from 'utils/getEnv.server'
import { getSEO } from '../utils/seo'
import { ClientStyleContext, ServerStyleContext } from '~/context'
import Footer from '~/components/footer'

import '@fontsource/crimson-pro/400.css'
import '@fontsource/crimson-pro/500.css'
import '@fontsource/crimson-pro/600.css'
import '@fontsource/crimson-pro/700.css'
import '@fontsource/crimson-pro/800.css'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const SEO = getSEO({
    title: 'Scajaquada Corridor Coalition',
    description:
      'Our community vision for a revitalized Scajaquada Creek, a connected Delaware Park, and a restored Humboldt Parkway.',
    image: `${data?.SITE_META?.baseUrl}/assets/images/meta-image.jpg`,
  })
  return [{ ...SEO }]
}

export function loader() {
  const { SITE_URL, VERCEL_URL, NODE_ENV } = getEnv()
  return json({
    NODE_ENV,
    SITE_META: {
      baseUrl:
        SITE_URL
        ?? VERCEL_URL
        ?? 'http://localhost:5173',
      twitterUrl: 'https://twitter.com/RightSize198',
      facebookUrl: 'https://www.facebook.com/sccbuffalo/',
      instagramUrl: 'https://www.instagram.com/sccoalition/',
    },
  })
}

interface DocumentProps {
  children: React.ReactNode
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
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
        (emotionCache.sheet as any)._insertTag(tag)
      })
      // reset cache to reapply global styles
      clientStyleData?.reset()
    }, [])

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <meta
            name="google-site-verification"
            content="4G-BG38xle3j3JMWw4-D7b4gPRj77EMFx-bkjNhyAuM"
          />
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
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
  },
)

export default function App() {
  const theme = extendTheme(customTheme)
  const { NODE_ENV } = useLoaderData<typeof loader>()

  return (
    <Document>
      <ChakraProvider theme={theme}>
        <Outlet />
        <Footer />
      </ChakraProvider>
      {NODE_ENV === 'production'
        ? (
            <script
              src="https://cdn.usefathom.com/script.js"
              data-site="BFWJFNRB"
              defer
            />
          )
        : null}
    </Document>
  )
}
