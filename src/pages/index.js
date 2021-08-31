import React from 'react'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Link,
  Stack,
} from '@chakra-ui/react'
import Container from '../components/common/Container'
import Navbar from '../components/global/Navbar'
import bgImage from '../images/delaware_full1.webp'
import Footer from '../components/global/Footer'
import { StaticImage } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'
import SEO from '../components/common/SEO'
import { graphql, Link as GatsbyLink } from 'gatsby'
import PostCard from '../components/PostCard'
import { useGoal } from 'gatsby-plugin-fathom'

export default function Home({ data }) {
  const { allMdx } = data
  const { nodes } = allMdx
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  const handleWestSideGoal = useGoal('RNWZWVFB')
  const handleBuffaloZooGoal = useGoal('WOJO4QYD')
  const handleBlackRockGoal = useGoal('ODH3SOMC')

  return (
    <>
      <SEO post={{ isHome: true }} />
      <Navbar isHeroInView={inView} />
      <main>
        <Flex
          ref={ref}
          w="100%"
          minH={{ base: '90vh', lg: '75vh' }}
          bg="tealGreen.700"
          position="relative"
          _before={{
            content: "''",
            position: 'absolute',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
            bg: 'tealGreen.700',
            backgroundBlendMode: 'luminosity',
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            opacity: '20%',
          }}
        >
          <Box mt="auto" w="100%" mb="12" position="relative">
            <Container>
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
        <Container>
          <Grid
            py={{ base: '16', lg: '32' }}
            templateColumns="repeat(12, 1fr)"
            gap="6"
          >
            <GridItem colStart={{ lg: '2' }} colSpan={{ base: '12', lg: '9' }}>
              <Box mb="24">
                <Grid
                  borderWidth="2px"
                  borderColor="tealGreen.700"
                  templateColumns={{ lg: 'repeat(6, 1fr)' }}
                >
                  <GridItem colSpan={{ lg: '2' }} p="6" bg="black">
                    <Flex boxSize="100%" align="center" justify="center">
                      <StaticImage
                        style={{
                          maxHeight: '256px',
                        }}
                        layout="constrained"
                        objectFit="contain"
                        src="../images/RegionCentral_VerticalLogoColor_Footer.png"
                        alt="Region Central Logo"
                        placeholder="blurred"
                      />
                    </Flex>
                  </GridItem>
                  <GridItem
                    colSpan={{ lg: '4' }}
                    p="8"
                    d="flex"
                    alignItems="center"
                  >
                    <Box as="article">
                      <Box mb="4">
                        <Heading as="h1" mb="1" color="tealGreen.800">
                          Upcoming Pop-up Events
                        </Heading>
                      </Box>
                      <Text
                        fontSize={{ base: 'lg', lg: 'xl' }}
                        mb="4"
                        color="tealGreen.700"
                      >
                        Please join us for our pop-up events throughout August
                        to learn more about Region Central and provide your
                        input on the process. The planning team will use your
                        input to help create the plan.
                      </Text>
                      <Stack as="dl" spacing="6">
                        <Box>
                          <Text as="dt" fontSize="xl" fontWeight="semibold">
                            Pine Grill Reunion @ MLK, Jr. Park
                          </Text>
                          <Text as="dd" fontSize="lg" color="tealGreen.700">
                            Sunday, August 8 from 4-7 PM
                          </Text>
                        </Box>
                        <Box>
                          <Text as="dt" fontSize="xl" fontWeight="semibold">
                            SkyRide Buffalo @ Outer Harbor Lakeside Bike Park
                          </Text>
                          <Text as="dd" fontSize="lg" color="tealGreen.700">
                            Sunday, August 15 from 8-10 AM
                          </Text>
                        </Box>
                        <Box>
                          <Text as="dt" fontSize="xl" fontWeight="semibold">
                            Westside Bazaar
                          </Text>
                          <Flex flexWrap="wrap">
                            <Text
                              as="dd"
                              fontSize="lg"
                              color="tealGreen.700"
                              mr="4"
                            >
                              Thursday, August 26 from 4-7 PM
                            </Text>
                            <Text
                              as="span"
                              color="tealGreen.800"
                              fontSize="lg"
                              fontWeight="semibold"
                            >
                              (
                              <Link
                                onClick={handleWestSideGoal}
                                textDecoration="underline"
                                href="https://g.page/WestSideBazaar"
                                isExternal
                              >
                                Get Directions
                              </Link>
                              )
                            </Text>
                          </Flex>
                        </Box>
                        <Box>
                          <Text as="dt" fontSize="xl" fontWeight="semibold">
                            Buffalo Zoo
                          </Text>
                          <Flex flexWrap="wrap">
                            <Text
                              as="dd"
                              fontSize="lg"
                              color="tealGreen.700"
                              mr="4"
                            >
                              Sunday, August 29 from 12-3 PM
                            </Text>
                            <Text
                              as="span"
                              color="tealGreen.800"
                              fontSize="lg"
                              fontWeight="semibold"
                            >
                              (
                              <Link
                                onClick={handleBuffaloZooGoal}
                                textDecoration="underline"
                                href="https://goo.gl/maps/H9PX311vk1b1TZzn9"
                                isExternal
                              >
                                Get Directions
                              </Link>
                              )
                            </Text>
                          </Flex>
                        </Box>
                        <Box>
                          <Text as="dt" fontSize="xl" fontWeight="semibold">
                            Black Rock @ Artisan Kitchens & Baths
                          </Text>
                          <Flex flexWrap="wrap">
                            <Text
                              as="dd"
                              fontSize="lg"
                              color="tealGreen.700"
                              mr="4"
                            >
                              Tuesday, August 31 from 6-8 PM
                            </Text>
                            <Text
                              as="span"
                              color="tealGreen.800"
                              fontSize="lg"
                              fontWeight="semibold"
                            >
                              (
                              <Link
                                onClick={handleBlackRockGoal}
                                textDecoration="underline"
                                href="https://goo.gl/maps/6gQe1xzJLiMfrTTu6"
                                isExternal
                              >
                                Get Directions
                              </Link>
                              )
                            </Text>
                          </Flex>
                        </Box>
                      </Stack>
                    </Box>
                  </GridItem>
                </Grid>
              </Box>
            </GridItem>
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
                  moments don’t come around very often, and 2021 may provide the
                  last, best chance in a generation to reclaim our creek and
                  community.
                  <br />
                  <br />
                  That's why we've designed and visualized a future for our
                  region; to establish a plan that revitalizes and restores the
                  dignity of our neighborhoods by promoting connectivity,
                  improving accessibility to our parks and waterways, and
                  developing a catalyst of economic development.
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
            <StaticImage
              src="../assets/images/web/a_render.jpg"
              alt="Aerial view facing North-West over the Scajaquada Expressway."
              placeholder="blurred"
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
                  community into the gateway of Buffalo's most important
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
            <StaticImage
              src="../assets/images/web/b_render.jpg"
              alt="Facing East on the Scajaquada Expressway, between Wegmans on
              Amherst Street and Buffalo State College."
              placeholder="blurred"
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
                  too long, we’ve lived alongside a creek that is polluted,
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
            <StaticImage
              src="../assets/images/web/c_render.jpg"
              alt="Facing North-West on the Kensington Expressway, between Sisters
              Hospital and Canisius College."
              placeholder="blurred"
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
            <StaticImage
              src="../assets/images/web/d_render.jpg"
              alt="Facing South-West in Delaware Park, from the Point of the Meadow
              Shelter and Soccer Fields."
              placeholder="blurred"
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
                  Buffalo's cultural institutions.
                </Text>
              </Box>
            </GridItem>
          </Grid>
          <Box py="16" mt="16" borderTopWidth="2px" borderColor="tealGreen.700">
            <Flex alignItems="baseline">
              <Heading mb="8" color="tealGreen.700">
                Get the Latest
              </Heading>
              <Link
                as={GatsbyLink}
                d="flex"
                textDecoration="underline"
                fontWeight="semibold"
                color="tealGreen.700"
                ml="4"
                to="/blog/"
              >
                See All our Posts →
              </Link>
            </Flex>
            <Grid templateColumns="repeat(12, 1fr)" gap="6">
              {nodes &&
                nodes.length > 0 &&
                nodes.map((post) => (
                  <GridItem key={post.id} colSpan={{ base: '12', lg: '4' }}>
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

export const pageQuery = graphql`
  query LatestPosts {
    allMdx(limit: 3, sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        id
        excerpt
        timeToRead
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          slug
          featuredImage {
            childImageSharp {
              gatsbyImageData(
                width: 400
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
    }
  }
`
