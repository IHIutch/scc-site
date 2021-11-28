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
    },
  },
})

export default theme
