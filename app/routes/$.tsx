import {
  Box,
  Container,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { Link as RemixLink, isRouteErrorResponse, useRouteError } from '@remix-run/react'
import { trackGoal } from 'fathom-client'
import Navbar from '~/components/navbar'

export function loader() {
  throw new Response('Page Not Found', {
    status: 404,
  })
}

export function ErrorBoundary() {
  if (typeof window !== 'undefined') {
    trackGoal('0TTQFI8Y', 0) // 404
  }

  const error = useRouteError()

  return isRouteErrorResponse(error)
    ? (
        <>
          <Navbar />
          <Container maxW="container.xl" my="32">
            <Box mb="12">
              <Heading
                as="h1"
                fontSize="9xl"
                mb="2"
                color="tealGreen.800"
                lineHeight="1.125"
              >
                {isRouteErrorResponse(error)
                  ? `${error.status}`
                  : 'Unknown Error'}
              </Heading>
              <Text fontSize="4xl" color="tealGreen.700" fontFamily="crimson">
                {error.statusText || 'Page Not Found'}
              </Text>
            </Box>
            <Box>
              <Text mb="4" fontSize="2xl" color="tealGreen.700">
                Try one of these pages to get back on track:
              </Text>
              <UnorderedList spacing="2">
                <ListItem
                  fontSize="xl"
                  fontWeight="semibold"
                  color="tealGreen.800"
                  textDecoration="underline"
                >
                  <Link as={RemixLink} to="/">
                    Home
                  </Link>
                </ListItem>
                <ListItem
                  fontSize="xl"
                  fontWeight="semibold"
                  color="tealGreen.800"
                  textDecoration="underline"
                >
                  <Link as={RemixLink} to="/blog">
                    Blog
                  </Link>
                </ListItem>
                <ListItem
                  fontSize="xl"
                  fontWeight="semibold"
                  color="tealGreen.800"
                  textDecoration="underline"
                >
                  <Link as={RemixLink} to="/events">
                    Events
                  </Link>
                </ListItem>
              </UnorderedList>
            </Box>
          </Container>
        </>
      )
    : (
        <div>
          <h1>Uh oh ...</h1>
          <p>Something unexpected happened.</p>
        </div>
      )
}
