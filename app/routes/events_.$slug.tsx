import React from 'react'
import { getEvent, getEvents } from 'utils/axios/events.server'

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Img,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useInView } from 'react-intersection-observer'

import dayjs from 'dayjs'
import { Calendar, ExternalLink, MapPin } from 'react-feather'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Link as RemixLink,
  useLoaderData,
  useLocation,
} from '@remix-run/react'
import Markdoc from '@markdoc/markdoc'
import { getSEO } from 'utils/seo'
import { useSiteMeta } from 'utils/use-site-meta'
import invariant from 'tiny-invariant'
import { getEnv } from 'utils/getEnv.server'
import b_render from '~/assets/images/b_render.jpg'
import { parseMarkdown } from '~/models/articles.server'
import ShareContainer from '~/components/shareContainer'
import EventCard from '~/components/eventCard'
import Navbar from '~/components/navbar'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const SEO = getSEO({
    title: data?.event?.title,
    image: data?.event?.featuredImage?.data?.attributes?.url,
  })

  return [{ ...SEO }]
}

export default function EventsPost() {
  const { event, upcomingEvents, preview } = useLoaderData<typeof loader>()
  const { pathname } = useLocation()
  const SITE_META = useSiteMeta()

  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  return (
    <>
      {preview && (
        <Box position="fixed" top="0" left="0" right="0" zIndex="2">
          <Alert status="info">
            <AlertIcon />
            <Text>
              This page is a preview.
              {' '}
              <Link
                href="/api/exit-preview"
                fontWeight="semibold"
                textDecoration="underline"
              >
                Click here
              </Link>
              {' '}
              to exit preview mode.
            </Text>
          </Alert>
        </Box>
      )}
      <Navbar isHeroInView={inView} />
      <main>
        <Flex
          w="100%"
          minH={{ base: '90vh', lg: '75vh' }}
          position="relative"
          ref={ref}
        >
          <Box
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
            bg="tealGreen.700"
          >
            <Img
              style={{ mixBlendMode: 'luminosity' }}
              opacity="20%"
              boxSize="100%"
              objectFit="cover"
              src={event?.featuredImage?.data?.attributes?.url || b_render}
              alt={event.title}
            />
          </Box>
          <Box mt="auto" pt="5" w="100%" mb="12" position="relative">
            <Container maxW="container.xl">
              <Grid py="6" templateColumns="repeat(12, 1fr)" gap="6">
                <GridItem
                  colStart={{ lg: 2, xl: 3 }}
                  colSpan={{ base: 12, lg: 10, xl: 8 }}
                >
                  <Box>
                    <Stack spacing="4">
                      <Heading
                        fontSize={{ base: '4xl', lg: '5xl' }}
                        mb="2"
                        color="white"
                        lineHeight="1.125"
                      >
                        {event?.title}
                      </Heading>
                      {event.startingAt && (
                        <HStack alignItems="center" color="white">
                          <Icon boxSize="5" as={Calendar} />
                          <Text
                            as="span"
                            fontSize="xl"
                            fontFamily="crimson"
                            fontWeight="semibold"
                          >
                            {dayjs(event.startingAt).format('dddd, MMMM D')}
                            {' '}
                            at
                            {' '}
                            {dayjs(event.startingAt).format('h:mma')}
                            {event.endingAt && (
                              <>
                                {' '}
                                -
                                {dayjs(event.endingAt).format('h:mma')}
                              </>
                            )}
                          </Text>
                        </HStack>
                      )}
                      {event.location && (
                        <HStack color="white" alignItems="start">
                          <Icon boxSize="5" as={MapPin} mt="1.5" />
                          <Box
                            as="span"
                            fontSize="xl"
                            fontFamily="crimson"
                            fontWeight="semibold"
                            mb="2"
                          >
                            {event.location?.title
                              ? (
                                  <Text>{event.location.title}</Text>
                                )
                              : null}
                            <Text>{event.location.streetAddress}</Text>
                            {event.location.city
                            && event.location.state
                            && event.location.zipCode && (
                              <Text>
                                {event.location.city}
                                ,
                                {event.location.state}
                                {' '}
                                {event.location.zipCode}
                              </Text>
                            )}
                            {event.location.googleMapsUrl
                              ? (
                                  <Button
                                    as={Link}
                                    href={event.location.googleMapsUrl}
                                    isExternal
                                    color="tealGreen.700"
                                    fontSize="lg"
                                    fontWeight="bold"
                                    mt="2"
                                    rightIcon={<Icon as={ExternalLink} />}
                                  >
                                    Get Directions
                                  </Button>
                                )
                              : null}
                          </Box>
                        </HStack>
                      )}
                    </Stack>
                  </Box>
                  {event?.lead && (
                    <Box borderTopWidth="1px" borderColor="white" pt="8" mt="8">
                      <Text
                        color="white"
                        fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                        fontFamily="crimson"
                        lineHeight="1.25"
                      >
                        {event.lead}
                      </Text>
                    </Box>
                  )}
                </GridItem>
              </Grid>
            </Container>
          </Box>
        </Flex>
        <Container maxW="container.xl" pt="16" pb="32">
          <Grid templateColumns="repeat(12, 1fr)" gap="6">
            <GridItem colStart={{ lg: 3 }} colSpan={{ base: 12, lg: 8 }}>
              <ShareContainer
                label="Share this event"
                url={SITE_META.baseUrl + pathname}
                title={event.title}
                mb="8"
              />
              <Box className="post-content">
                {Markdoc.renderers.react(event.content, React, {
                  components: {
                    // eslint-disable-next-line react/no-nested-components
                    Image: (props: any) => <Img width="100%" {...props} />,
                    // eslint-disable-next-line react/no-nested-components
                    ExternalLink: (props: any) => (
                      <a
                        href={props.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {props.children}
                      </a>
                    ),
                    // eslint-disable-next-line react/no-nested-components
                    InternalLink: (props: any) => (
                      <RemixLink to={props.pathname}>
                        {props.children}
                      </RemixLink>
                    ),
                  },
                })}
              </Box>
              <Box
                borderTopWidth="2px"
                borderBottomWidth="2px"
                borderColor="tealGreen.800"
                my="24"
                py="12"
              >
                <Text fontFamily="crimson" fontSize="3xl" color="tealGreen.700">
                  Support the removal of the Scajaquada Expressway by following
                  us on
                  {' '}
                  <Link
                    href={SITE_META.twitterUrl}
                    fontWeight="bold"
                    textDecoration="underline"
                    isExternal
                  >
                    Twitter
                  </Link>
                  {' '}
                  and
                  {' '}
                  <Link
                    href={SITE_META.facebookUrl}
                    fontWeight="bold"
                    textDecoration="underline"
                    isExternal
                  >
                    Facebook
                  </Link>
                  .
                </Text>
              </Box>
            </GridItem>
          </Grid>
          {upcomingEvents.length > 0
            ? (
                <Box borderColor="tealGreen.700">
                  <Flex alignItems="baseline">
                    <Heading mb="8" color="tealGreen.700">
                      Upcoming Events
                    </Heading>
                    <Link
                      as={RemixLink}
                      to="/events"
                      display="flex"
                      textDecoration="underline"
                      fontWeight="semibold"
                      color="tealGreen.700"
                      ml="4"
                    >
                      See All Events →
                    </Link>
                  </Flex>
                  <Grid templateColumns="repeat(12, 1fr)" gap="6">
                    {upcomingEvents.map(event => (
                      <GridItem
                        key={event.id}
                        colSpan={{ base: 12, md: 6, lg: 4 }}
                      >
                        <EventCard post={event} />
                      </GridItem>
                    ))}
                  </Grid>
                </Box>
              )
            : null}
        </Container>
      </main>
    </>
  )
}

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.slug, 'Missing event \'slug\'')

  const { STRAPI_PREVIEW_SECRET } = getEnv()

  const data = await getEvents({
    publicationState:
      params.preview === STRAPI_PREVIEW_SECRET ? 'preview' : 'live',
  })

  const foundEvent = data.find(event => event.attributes.slug === params.slug)

  if (!foundEvent) {
    throw new Response('Event Not Found', {
      status: 404,
    })
  }

  const eventsData = await getEvents({
    publicationState:
      params.preview === STRAPI_PREVIEW_SECRET ? 'preview' : 'live',
    sort: 'startingAt:desc',
  })

  const upcomingEvents = eventsData
    .filter(event => event.id !== foundEvent.id)
    .filter(event => new Date(event.attributes.startingAt) > new Date())
    .map(event => ({
      id: event.id,
      title: event.attributes.title,
      slug: event.attributes.slug,
      publishedAt: event.attributes.publishedAt,
      featuredImage: event.attributes.featuredImage,
      startingAt: event.attributes.startingAt,
      location: event.attributes.location,
    }))
    .slice(0, 3)

  const { attributes: event } = await getEvent(foundEvent.id)

  const parsedContent = parseMarkdown(event.content)

  return json({
    event: {
      ...event,
      content: parsedContent,
    },
    upcomingEvents,
    preview: params.preview,
  })
}
