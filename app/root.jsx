import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { withEmotionCache } from '@emotion/react'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
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
import { getSEO } from '../utils/seo'
import { json } from '@remix-run/node'
import b_render from 'public/assets/images/web/b_render.jpg'

export const meta = () => {
  const SEO = getSEO({
    title: 'Scajaquada Corridor Coalition',
    description:
      'Our community vision for a revitalized Scajaquada Creek, a connected Delaware Park, and a restored Humboldt Parkway.',
    image: b_render,
  })
  return {
    charset: 'utf-8',
    viewport: 'width=device-width,initial-scale=1',
    'google-site-verification': '4G-BG38xle3j3JMWw4-D7b4gPRj77EMFx-bkjNhyAuM',
    ...SEO,
  }
}

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

export const loader = () => {
  return json({
    SITE_META: {
      baseUrl:
        process?.env?.SITE_URL ??
        process?.env?.VERCEL_URL ??
        'http://localhost:3000',
      twitterUrl: 'https://twitter.com/RightSize198',
      facebookUrl: 'https://www.facebook.com/sccbuffalo/',
    },
  })
}

const Document = withEmotionCache(({ children }, emotionCache) => {
  const serverStyleData = useContext(ServerStyleContext)
  const clientStyleData = useContext(ClientStyleContext)
  const loaderData = useLoaderData()

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
        <script
          dangerouslySetInnerHTML={{
            __html: `window.SITE_META = ${JSON.stringify(
              loaderData.SITE_META
            )}`,
          }}
        />
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
})

export const CatchBoundary = () => {
  const theme = extendTheme(customTheme)
  const caught = useCatch()

  return (
    <Document title={``}>
      <ChakraProvider theme={theme}>
        <div>
          <h1>{caught.status}</h1>
          <p>{caught.statusText}</p>
        </div>
        {/* <Footer /> */}
      </ChakraProvider>
    </Document>
  )
}
// {/* <html>
//   <head>
//     <title>Oops! - {caught.status}</title>
//     <Meta />
//     <Links />
//   </head>
//   <body>
//     <h1>{caught.status}</h1>
//     <p>{caught.statusText}</p>
//     <Scripts />
//   </body>
// </html> */}

export default function App() {
  const theme = extendTheme(customTheme)
  const loaderData = useLoaderData()

  return (
    <Document>
      <ChakraProvider theme={theme}>
        <Outlet context={{ SITE_META: loaderData.SITE_META }} />
        <Footer SITE_META={loaderData.SITE_META} />
      </ChakraProvider>
    </Document>
  )
}
