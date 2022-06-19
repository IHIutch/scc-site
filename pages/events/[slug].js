import React from 'react'
import { getEvent, getEvents } from '@/utils/axios/events'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import {
  Alert,
  AlertIcon,
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Text,
} from '@chakra-ui/react'
import { useInView } from 'react-intersection-observer'
import NextLink from 'next/link'
import NextImage from 'next/image'

import { SEO } from '@/components/seo'
import dayjs from 'dayjs'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Calendar } from 'react-feather'
import b_render from '@/public/assets/images/b_render.jpg'

export default function EventsPost({ event, preview }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

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
                    <Heading
                      fontSize={{ base: '4xl', lg: '5xl' }}
                      mb="2"
                      color="white"
                      lineHeight="1.125"
                    >
                      {event?.title}
                    </Heading>
                    <Text
                      as="span"
                      color="white"
                      fontSize="xl"
                      fontFamily="crimson"
                    >
                      {event.startingAt && (
                        <HStack alignItems="center">
                          <Icon boxSize="5" as={Calendar} />
                          <Text fontWeight="semibold" mb="2">
                            {dayjs(event.startingAt).format(
                              'dddd, MMMM D h:mma'
                            )}
                          </Text>
                          {event.endingAt && (
                            <Text fontWeight="semibold" mb="2">
                              - {dayjs(event.endingAt).format('h:mma')}
                            </Text>
                          )}
                        </HStack>
                      )}
                    </Text>
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
        <Container maxW="container.xl">
          <Grid py="32" templateColumns="repeat(12, 1fr)" gap="6">
            <GridItem colStart={{ lg: '3' }} colSpan={{ base: '12', lg: '8' }}>
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
                borderTopColor="tealGreen.800"
                mt="24"
                pt="12"
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
        </Container>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  const { data } = await getEvents()

  const paths = data.map((event) => ({
    params: {
      slug: event.attributes.slug,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params, preview = true }) {
  const { data } = await getEvents({
    publicationState: preview ? 'preview' : 'live',
  })
  const foundEvent = data.find((event) => event.attributes.slug === params.slug)

  if (!foundEvent) {
    return {
      notFound: true,
    }
  }

  const {
    data: { attributes: event },
  } = await getEvent(foundEvent.id)

  event.content = await serialize(event.content)

  return {
    props: {
      event,
    },
    revalidate: 60 * 60 * 24,
  }
}
