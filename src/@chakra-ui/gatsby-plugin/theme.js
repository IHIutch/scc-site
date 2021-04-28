import { extendTheme } from '@chakra-ui/react'

import '@fontsource/crimson-pro/400.css'
import '@fontsource/crimson-pro/500.css'
import '@fontsource/crimson-pro/600.css'
import '@fontsource/crimson-pro/700.css'
import '@fontsource/crimson-pro/800.css'

const theme = extendTheme({
  fonts: {
    heading: 'Crimson Pro',
    // body: 'Vollkorn',
    vollkorn: 'Vollkorn',
    domine: 'Domine',
    crimson: 'Crimson Pro',
  },
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
      '.post-content >': {
        h1: {
          fontSize: '6xl',
          fontWeight: 'bold',
          fontFamily: 'crimson',
          color: 'tealGreen.800',
          mt: '12',
          mb: '4',
          lineHeight: '1.2',
        },
        h2: {
          fontSize: '5xl',
          fontWeight: 'bold',
          fontFamily: 'crimson',
          color: 'tealGreen.800',
          mt: '12',
          mb: '4',
          lineHeight: '1.2',
        },
        h3: {
          fontSize: '4xl',
          fontWeight: 'bold',
          fontFamily: 'crimson',
          color: 'tealGreen.800',
          mt: '12',
          mb: '4',
          lineHeight: '1.2',
        },
        p: {
          fontSize: {
            base: 'xl',
            lg: '2xl',
          },
          lineHeight: '2',
          color: 'tealGreen.700',
        },
        'p + p': {
          mt: '12',
        },
        a: {
          fontWeight: 'bold',
          textDecoration: 'underline',
        },
        'blockquote > p': {
          textAlign: 'center',
          fontSize: '4xl',
          fontWeight: 'bold',
          fontFamily: 'crimson',
          color: 'tealGreen.800',
          my: '16',
          lineHeight: '1.6',
        },
        hr: {
          my: '12',
          borderTopColor: 'tealGreen.800',
          borderTopWidth: '2px',
        },
        ul: {
          mt: '6',
          mb: '12',
          pl: '8',
          fontSize: {
            base: 'lg',
            lg: 'xl',
          },
          lineHeight: '1.6',
          color: 'tealGreen.800',
        },
        '* + ul li': {
          mt: '4',
        },
      },
    },
  },
})

export default theme
