import {
  Box,
  Container,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { Link as RemixLink, useCatch } from '@remix-run/react'
import Navbar from '~/components/navbar'
import { trackGoal } from 'fathom-client'

export const loader = () => {
  throw new Response('Page Not Found', {
    status: 404,
  })
}

export default function FourOhFour() {
  const caught = useCatch()

  if (typeof window !== 'undefined') {
    trackGoal('0TTQFI8Y', 0) // 404
  }

  return (
    <>
      <Navbar />
      <Container maxW="container.xl" mt="32">
        <Box mb="12">
          <Heading
            as="h1"
            fontSize="9xl"
            mb="2"
            color="tealGreen.800"
            lineHeight="1.125"
          >
            {caught.status}
          </Heading>
          <Text fontSize="4xl" color="tealGreen.700" fontFamily="crimson">
            {caught.statusText || 'Page Not Found'}
          </Text>
        </Box>
        <Box>
          <Text mb="4" fontSize="2xl" color="tealGreen.700">
            Try one of these pages to get back on track:
          </Text>
          <UnorderedList spacing="2" sep>
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
}
