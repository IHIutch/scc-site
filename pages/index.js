import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import PostCard from '@/components/postCard'
import { Image } from '@chakra-ui/image'
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  Text,
} from '@chakra-ui/layout'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { trackGoal } from 'fathom-client'
import { getPosts } from '@/utils/axios/posts'
import delaware_full1 from '@/public/assets/images/delaware_full1.webp'
import a_render from '@/public/assets/images/web/a_render.jpg'
import b_render from '@/public/assets/images/web/b_render.jpg'
import c_render from '@/public/assets/images/web/c_render.jpg'
import d_render from '@/public/assets/images/web/d_render.jpg'
import { SEO } from '@/components/seo'
import { getEvents } from '@/utils/axios/events'
import EventCard from '@/components/eventCard'

// const handleWestSideGoal = trackGoal('RNWZWVFB')
// const handleBuffaloZooGoal = trackGoal('WOJO4QYD')
// const handleBlackRockGoal = trackGoal('ODH3SOMC')

export default function Home({ posts, upcomingEvents }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  })
  return (
    <>
      <SEO />
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
                placeholder="blur"
                layout="fill"
                objectFit="cover"
                src={delaware_full1}
                alt="A beautiful view of Hoyt Lake"
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
                  <Box borderBottomWidth="1px" borderColor="white">
                    <Heading
                      fontSize={{ base: '4xl', lg: '5xl' }}
                      mb="8"
                      color="white"
                      lineHeight="1.125"
                    >
                      A Once-In-A-Lifetime Opportunity: Remove Our Urban Highway
                      System
                    </Heading>
                  </Box>
                  <Box mt="6">
                    <Text
                      color="white"
                      fontSize="3xl"
                      fontFamily="crimson"
                      lineHeight="1.25"
                    >
                      Our community vision for a revitalized Scajaquada Creek, a
                      connected Delaware Park, and a restored Humboldt Parkway.
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
            </Container>
          </Box>
        </Flex>
        <Container maxW="container.xl">
          <Grid py="16" templateColumns="repeat(12, 1fr)" gap="6">
            <GridItem colStart={{ lg: '3' }} colSpan={{ base: '12', lg: '8' }}>
              <Box>
                <Text
                  fontSize={{ base: 'xl', lg: '2xl' }}
                  lineHeight="2"
                  color="tealGreen.700"
                >
                  What is possible for the reimagination of the Scajaquada
                  Corridor? Many decisions are on the horizon for infrastructure
                  priorities across the nation and in our region. Defining
                  moments don&apos;t come around very often, and 2021 may
                  provide the last, best chance in a generation to reclaim our
                  creek and community.
                </Text>
              </Box>
            </GridItem>
          </Grid>
          {upcomingEvents.length > 0 ? (
            <Flex>
              <Box
                py="16"
                my="16"
                borderTopWidth="2px"
                borderBottomWidth="2px"
                borderColor="tealGreen.700"
              >
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
                  {upcomingEvents.map((events, idx) => (
                    <GridItem key={idx} colSpan={{ base: '12', lg: '4' }}>
                      <EventCard post={events} />
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            </Flex>
          ) : null}
          <Grid
            pt={{ base: '8', lg: '16' }}
            pb={{ base: '32', lg: '48' }}
            templateColumns="repeat(12, 1fr)"
            gap="6"
          >
            <GridItem colStart={{ lg: '3' }} colSpan={{ base: '12', lg: '8' }}>
              <Box>
                <Text
                  fontSize={{ base: 'xl', lg: '2xl' }}
                  lineHeight="2"
                  color="tealGreen.700"
                >
                  That&apos;s why we&apos;ve designed and visualized a future
                  for our region; to establish a plan that revitalizes and
                  restores the dignity of our neighborhoods by promoting
                  connectivity, improving accessibility to our parks and
                  waterways, and developing a catalyst of economic development.
                </Text>
              </Box>
            </GridItem>
          </Grid>
          <Flex
            as="figure"
            direction="column"
            borderWidth="2px"
            borderColor="tealGreen.700"
          >
            <Image
              as={NextImage}
              src={a_render}
              alt="Aerial view facing North-West over the Scajaquada Expressway."
              placeholder="blur"
            />
            <Box
              as="figcaption"
              p="2"
              color="tealGreen.800"
              fontSize="sm"
              fontWeight="medium"
            >
              Aerial view facing North-West over the Scajaquada Expressway.
            </Box>
          </Flex>
          <Grid
            pt={{ base: '8', lg: '16' }}
            pb={{ base: '32', lg: '48' }}
            templateColumns="repeat(12, 1fr)"
            gap="6"
          >
            <GridItem colStart={{ lg: '3' }} colSpan={{ base: '12', lg: '8' }}>
              <Box>
                <Heading
                  as="h2"
                  mb="4"
                  color="tealGreen.800"
                  fontSize={{ base: '4xl', lg: '5xl' }}
                  lineHeight="1.2"
                >
                  A Revitalized Black Rock Harbor
                </Heading>
                <Text
                  fontSize={{ base: 'xl', lg: '2xl' }}
                  lineHeight="2"
                  color="tealGreen.700"
                >
                  The Scajaquada Expressway cut communities in half and
                  destroyed economic opportunities. By restoring long-neglected
                  neighborhoods, such as Black Rock, we can transform our
                  community into the gateway of Buffalo&apos;s most important
                  waterway.
                </Text>
              </Box>
            </GridItem>
          </Grid>
          <Flex
            as="figure"
            direction="column"
            borderWidth="2px"
            borderColor="tealGreen.700"
          >
            <Image
              as={NextImage}
              src={b_render}
              alt="Facing East on the Scajaquada Expressway, between Wegmans on
              Amherst Street and Buffalo State College."
              placeholder="blur"
            />
            <Box
              as="figcaption"
              p="2"
              color="tealGreen.800"
              fontSize="sm"
              fontWeight="medium"
            >
              Facing East on the Scajaquada Expressway, between Wegmans on
              Amherst Street and Buffalo State College.
            </Box>
          </Flex>
          <Grid
            pt={{ base: '8', lg: '16' }}
            pb={{ base: '32', lg: '48' }}
            templateColumns="repeat(12, 1fr)"
            gap="6"
          >
            <GridItem colStart={{ lg: '3' }} colSpan={{ base: '12', lg: '8' }}>
              <Box>
                <Heading
                  as="h2"
                  mb="4"
                  color="tealGreen.800"
                  fontSize={{ base: '4xl', lg: '5xl' }}
                  lineHeight="1.2"
                >
                  A Restored Scajaquada Creek Corridor
                </Heading>
                <Text
                  fontSize={{ base: 'xl', lg: '2xl' }}
                  lineHeight="2"
                  color="tealGreen.700"
                >
                  Scajaquada Creek is one of the most polluted and impaired. For
                  too long, we&apos;ve lived alongside a creek that is polluted,
                  buried, hardened, industrialized, and mangled by road
                  infrastructure that supports minimal vegetation and wildlife,
                  and is choked by raw sewage every time it rains.
                  <br />
                  <br />
                  Our vision transforms Scajaquada Creek into a waterfront
                  landmark that our city deserves; providing direct access to
                  the water, significantly increasing local green-space, and
                  restoring natural habitats.
                </Text>
              </Box>
            </GridItem>
          </Grid>
          <Flex
            as="figure"
            direction="column"
            borderWidth="2px"
            borderColor="tealGreen.700"
          >
            <Image
              as={NextImage}
              src={c_render}
              alt="Facing North-West on the Kensington Expressway, between Sisters
              Hospital and Canisius College."
              placeholder="blur"
            />
            <Box
              as="figcaption"
              p="2"
              color="tealGreen.800"
              fontSize="sm"
              fontWeight="medium"
            >
              Facing North-West on the Kensington Expressway, between Sisters
              Hospital and Canisius College.
            </Box>
          </Flex>
          <Grid
            pt={{ base: '8', lg: '16' }}
            pb={{ base: '32', lg: '48' }}
            templateColumns="repeat(12, 1fr)"
            gap="6"
          >
            <GridItem colStart={{ lg: '3' }} colSpan={{ base: '12', lg: '8' }}>
              <Box>
                <Heading
                  as="h2"
                  mb="4"
                  color="tealGreen.800"
                  fontSize={{ base: '4xl', lg: '5xl' }}
                  lineHeight="1.2"
                >
                  A Magnificent Humboldt Parkway
                </Heading>
                <Text
                  fontSize={{ base: 'xl', lg: '2xl' }}
                  lineHeight="2"
                  color="tealGreen.700"
                >
                  Our vision restores Humboldt Parkway to its historic, lush,
                  green promenade. Serving as a vibrant community gathering
                  place by creating liveable neighborhoods around our cultural
                  institutions like Buffalo Museum of Science, Olmsted-designed
                  Delaware and MLK Parks, and Canisius College.
                </Text>
              </Box>
            </GridItem>
          </Grid>
          <Flex
            as="figure"
            direction="column"
            borderWidth="2px"
            borderColor="tealGreen.700"
          >
            <Image
              as={NextImage}
              src={d_render}
              alt="Facing South-West in Delaware Park, from the Point of the Meadow
              Shelter and Soccer Fields."
              placeholder="blur"
            />
            <Box
              as="figcaption"
              p="2"
              color="tealGreen.800"
              fontSize="sm"
              fontWeight="medium"
            >
              Facing South-West in Delaware Park, from the Point of the Meadow
              Shelter and Soccer Fields.
            </Box>
          </Flex>
          <Grid
            pt={{ base: '8', lg: '16' }}
            pb={{ base: '16', lg: '32' }}
            templateColumns="repeat(12, 1fr)"
            gap="6"
          >
            <GridItem colStart={{ lg: '3' }} colSpan={{ base: '12', lg: '8' }}>
              <Box>
                <Heading
                  as="h2"
                  mb="4"
                  color="tealGreen.800"
                  fontSize={{ base: '4xl', lg: '5xl' }}
                  lineHeight="1.2"
                >
                  A Reconnected Delaware Park
                </Heading>
                <Text
                  fontSize={{ base: 'xl', lg: '2xl' }}
                  lineHeight="2"
                  color="tealGreen.700"
                >
                  The Scajaquada Expressway erased significant portions of
                  Delaware Park, slashing apart the Meadow and the Lake. Our
                  vision reconnects the park, restores the historic stone bridge
                  arched over Delaware Avenue, and celebrate the cornerstone of
                  Buffalo&apos;s cultural institutions.
                </Text>
              </Box>
            </GridItem>
          </Grid>
          <Box py="16" mt="16" borderTopWidth="2px" borderColor="tealGreen.700">
            <Flex alignItems="baseline">
              <Heading mb="8" color="tealGreen.700">
                Get the Latest
              </Heading>
              <NextLink href="/blog" passHref>
                <Link
                  d="flex"
                  textDecoration="underline"
                  fontWeight="semibold"
                  color="tealGreen.700"
                  ml="4"
                >
                  See All Posts →
                </Link>
              </NextLink>
            </Flex>
            <Grid templateColumns="repeat(12, 1fr)" gap="6">
              {posts.map((post, idx) => (
                <GridItem key={idx} colSpan={{ base: '12', lg: '4' }}>
                  <PostCard post={post} />
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const { data: postsData } = await getPosts()
  const posts = postsData
    .map((post) => ({
      ...post.attributes,
    }))
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 3)

  const { data: eventsData } = await getEvents({
    publicationState: 'preview',
  })
  const upcomingEvents = eventsData
    .map((event) => ({
      ...event.attributes,
    }))
    .filter((event) => new Date(event.startingAt) > new Date())
    .sort((a, b) => new Date(b.startingAt) - new Date(a.startingAt))
    .slice(0, 3)

  return {
    props: {
      posts,
      upcomingEvents,
    },
    revalidate: 60 * 60 * 24,
  }
}
