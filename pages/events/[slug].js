import React from 'react'
import { getEvent, getEvents } from '@/utils/axios/events'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useInView } from 'react-intersection-observer'
import NextLink from 'next/link'
import NextImage from 'next/image'

import { SEO } from '@/components/seo'
import dayjs from 'dayjs'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Calendar, ExternalLink, MapPin } from 'react-feather'
import b_render from '@/public/assets/images/b_render.jpg'
import EventCard from '@/components/eventCard'
import { useRouter } from 'next/router'
import ShareContainer from '@/components/shareContainer'

export default function EventsPost({ event, upcomingEvents, preview }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  const { asPath } = useRouter()

  return (
    <>
      <SEO
        title={event?.title}
        description={event?.lead}
        slug={`/events/${event?.slug}`}
        image={event?.featuredImage?.data?.attributes?.url}
      />
      {preview && (
        <Box position="fixed" top="0" left="0" right="0" zIndex="2">
          <Alert status="info">
            <AlertIcon />
            <Text>
              This page is a preview.{' '}
              <Link
                href="/api/exit-preview"
                fontWeight="semibold"
                textDecoration="underline"
              >
                Click here
              </Link>{' '}
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
            <Box
              style={{ mixBlendMode: 'luminosity' }}
              opacity="20%"
              w="100%"
              h="100%"
            >
              <Image
                as={NextImage}
                priority={true}
                layout="fill"
                objectFit="cover"
                src={event?.featuredImage?.data?.attributes?.url || b_render}
                alt={event.title}
              />
            </Box>
          </Box>
          <Box mt="auto" pt="5" w="100%" mb="12" position="relative">
            <Container maxW="container.xl">
              <Grid py="6" templateColumns="repeat(12, 1fr)" gap="6">
                <GridItem
                  colStart={{ lg: '2', xl: '3' }}
                  colSpan={{ base: '12', lg: '10', xl: '8' }}
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
                            {dayjs(event.startingAt).format(
                              'dddd, MMMM D h:mma'
                            )}
                            {event.endingAt && (
                              <> - {dayjs(event.endingAt).format('h:mma')}</>
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
                            {event.location?.title ? (
                              <Text>{event.location.title}</Text>
                            ) : null}
                            <Text>{event.location.streetAddress}</Text>
                            {event.location.city &&
                              event.location.state &&
                              event.location.zipCode && (
                                <Text>
                                  {event.location.city}, {event.location.state}{' '}
                                  {event.location.zipCode}
                                </Text>
                              )}
                            {event.location.googleMapsUrl ? (
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
                            ) : null}
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
            <GridItem colStart={{ lg: '3' }} colSpan={{ base: '12', lg: '8' }}>
              <ShareContainer
                label="Share this event"
                url={process.env.SITE_META.siteUrl + asPath}
                title={event.title}
                mb="8"
              />
              <Box className="post-content">
                <MDXRemote
                  {...(event?.content || '')}
                  components={{
                    // eslint-disable-next-line jsx-a11y/alt-text
                    img: (props) => <Image width="100%" {...props} />,
                  }}
                />
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
                  us on{' '}
                  <NextLink href={process.env.SITE_META.twitterUrl} passHref>
                    <Link
                      href={process.env.SITE_META.twitterUrl}
                      fontWeight="bold"
                      textDecoration="underline"
                      isExternal
                    >
                      Twitter
                    </Link>
                  </NextLink>{' '}
                  and{' '}
                  <NextLink href={process.env.SITE_META.facebookUrl} passHref>
                    <Link
                      href={process.env.SITE_META.facebookUrl}
                      fontWeight="bold"
                      textDecoration="underline"
                      isExternal
                    >
                      Facebook
                    </Link>
                  </NextLink>
                  .
                </Text>
              </Box>
            </GridItem>
          </Grid>
          {upcomingEvents.length > 0 ? (
            <Box borderColor="tealGreen.700">
              <Flex alignItems="baseline">
                <Heading mb="8" color="tealGreen.700">
                  Upcoming Events
                </Heading>
                <NextLink href="/events" passHref>
                  <Link
                    d="flex"
                    textDecoration="underline"
                    fontWeight="semibold"
                    color="tealGreen.700"
                    ml="4"
                  >
                    See All Events →
                  </Link>
                </NextLink>
              </Flex>
              <Grid templateColumns="repeat(12, 1fr)" gap="6">
                {upcomingEvents.map((event, idx) => (
                  <GridItem
                    key={idx}
                    colSpan={{ base: '12', md: '6', lg: '4' }}
                  >
                    <EventCard post={event} />
                  </GridItem>
                ))}
              </Grid>
            </Box>
          ) : null}
        </Container>
      </main>
      <Footer />
    </>
  )
}

export async function getServerSideProps({ params, preview = false }) {
  const { data } = await getEvents({
    publicationState: preview ? 'preview' : 'live',
  })
  const foundEvent = data.find((event) => event.attributes.slug === params.slug)

  if (!foundEvent) {
    return {
      notFound: true,
    }
  }

  const { data: eventsData } = await getEvents({
    publicationState: preview ? 'preview' : 'live',
  })

  const upcomingEvents = eventsData
    .filter((event) => event.id !== foundEvent.id)
    .filter((event) => new Date(event.startingAt) > new Date())
    .map((event) => ({
      title: event.attributes.title,
      slug: event.attributes.slug,
      publishedAt: event.attributes.publishedAt,
      featuredImage: event.attributes.featuredImage,
      startingAt: event.attributes.startingAt,
      location: event.attributes.location,
    }))
    .sort((a, b) => new Date(a.startingAt) - new Date(b.startingAt))
    .slice(0, 3)

  const {
    data: { attributes: event },
  } = await getEvent(foundEvent.id)

  event.content = await serialize(event.content)

  return {
    props: {
      event,
      upcomingEvents,
      preview,
    },
  }
}
