import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import customTheme from '@/customTheme'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as Fathom from 'fathom-client'

const theme = extendTheme(customTheme)

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load('BFWJFNRB')

      function onRouteChangeComplete() {
        Fathom.trackPageview()
      }
      // Record a pageview when route changes
      router.events.on('routeChangeComplete', onRouteChangeComplete)

      // Unassign event listener
      return () => {
        router.events.off('routeChangeComplete', onRouteChangeComplete)
      }
    }
  }, [router.events])

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
