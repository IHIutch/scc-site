import React from 'react'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Link,
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

export default function Home({ data }) {
  const { allMdx } = data
  const { nodes } = allMdx
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

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
                  That's why we've designed and visualized a future our region;
                  to establish a plan that revitalizes and restores the dignity
                  of our neighborhoods by promoting connectivity, improving
                  accessibility to our parks and waterways, and developing a
                  catalyst of economic development.
                </Text>
              </Box>
            </GridItem>
          </Grid>
          <Flex borderWidth="2px" borderColor="tealGreen.700">
            <StaticImage
              src="../assets/images/web/a_render.jpg"
              alt=""
              placeholder="blurred"
            />
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
          <Flex borderWidth="2px" borderColor="tealGreen.700">
            <StaticImage
              src="../assets/images/web/b_render.jpg"
              alt=""
              placeholder="blurred"
            />
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
          <Flex borderWidth="2px" borderColor="tealGreen.700">
            <StaticImage
              src="../assets/images/web/c_render.jpg"
              alt=""
              placeholder="blurred"
            />
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
          <Flex borderWidth="2px" borderColor="tealGreen.700">
            <StaticImage
              src="../assets/images/web/d_render.jpg"
              alt=""
              placeholder="blurred"
            />
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
                to="/blog"
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
