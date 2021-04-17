import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    tealGreen: {
      50: '#e2faf8',
      100: '#c6e7e4',
      200: '#a6d6d1',
      300: '#86c6be',
      400: '#346E67',
      500: '#4d9c92',
      600: '#397971',
      700: '#275751',
      800: '#133531',
      900: '#001411',
    },
  },
  styles: {
    global: {
      'html, body': {
        // bg: "#f4fbfa",
        bg: 'blue.50',
      },
      '.post-content': {
        h1: {
          fontSize: 'xl',
          mb: '4',
        },
        p: {
          fontSize: '2xl',
          lineHeight: '1.6',
          color: 'tealGreen.700',
        },
        '* + p': {
          mt: '12',
        },
      },
    },
  },
})

export default theme
