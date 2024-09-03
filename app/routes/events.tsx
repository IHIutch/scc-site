import { getEvents } from 'utils/axios/events.server'
import { useInView } from 'react-intersection-observer'
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useLoaderData } from '@remix-run/react'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { getSEO } from 'utils/seo'
import EventCard from '~/components/eventCard'
import Navbar from '~/components/navbar'

export const meta: MetaFunction<typeof loader> = () => {
  const SEO = getSEO({ title: 'All Events' })
  return [{ ...SEO }]
}

export default function BlogArchive() {
  const { events } = useLoaderData<typeof loader>()

  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  const upcomingEvents = events.filter(e => e.isUpcoming).sort((a, b) => new Date(a.startingAt).valueOf() - new Date(b.startingAt).valueOf())
  const pastEvents = events.filter(e => !e.isUpcoming)

  return (
    <>
      <Navbar isHeroInView={inView} />
      <main>
        <Box bg="tealGreen.700" pt="32" ref={ref}>
          <Grid
            as={Container}
            maxW="container.lg"
            templateColumns="repeat(12, 1fr)"
            pb="20"
          >
            <GridItem colStart={{ lg: 2 }} colSpan={{ base: 12, lg: 10 }}>
              <Box borderBottomWidth="1px" borderColor="white">
                <Heading
                  fontSize={{ base: '4xl', lg: '5xl' }}
                  mb="8"
                  color="white"
                  lineHeight="1.125"
                >
                  Events
                </Heading>
              </Box>
              <Box mt="6">
                <Text
                  color="white"
                  fontSize="3xl"
                  fontFamily="crimson"
                  lineHeight="1.25"
                >
                  Stay up to date on the latest updates of our mission: Creating
                  a better Buffalo through community collaboration and strategic
                  thinking.
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Box>
        <Grid
          as={Container}
          maxW="container.lg"
          templateColumns="repeat(12, 1fr)"
          py="24"
        >
          <GridItem
            as={VStack}
            colStart={{ lg: 2 }}
            colSpan={{ base: 12, lg: 10 }}
            spacing="24"
          >
            <Box w="full">
              <Heading mb="8" color="tealGreen.700">
                Upcoming Events
              </Heading>
              {upcomingEvents.length > 0
                ? (
                    <Grid templateColumns="repeat(12, 1fr)" gap="6">
                      {upcomingEvents.map(event => (
                        <GridItem key={event.id} colSpan={{ base: 12, md: 6 }}>
                          <EventCard post={event} />
                        </GridItem>
                      ))}
                    </Grid>
                  )
                : (
                    <Text>No upcoming events planned</Text>
                  )}
            </Box>
            <Box w="full">
              <Heading mb="8" color="tealGreen.700">
                Past Events
              </Heading>
              {pastEvents.length > 0
                ? (
                    <Grid templateColumns="repeat(12, 1fr)" gap="6">
                      {pastEvents.map(event => (
                        <GridItem key={event.id} colSpan={{ base: 12, md: 6 }}>
                          <EventCard post={event} />
                        </GridItem>
                      ))}
                    </Grid>
                  )
                : (
                    <Text>No past events</Text>
                  )}
            </Box>
          </GridItem>
        </Grid>
      </main>
    </>
  )
}

export async function loader({ params }: LoaderFunctionArgs) {
  const data = await getEvents({
    publicationState: params.preview ? 'preview' : 'live',
    sort: 'startingAt:desc',
  })

  const events = data.map(event => ({
    ...event.attributes,
    id: event.id,
    isUpcoming: new Date(event.attributes.startingAt) > new Date(),
  }))

  return json({
    events,
  })
}
