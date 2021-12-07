import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import customTheme from '@/customTheme'

const theme = extendTheme(customTheme)

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
