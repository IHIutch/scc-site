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
  const { allMarkdownRemark } = data
  const { nodes } = allMarkdownRemark
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
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
    allMarkdownRemark(limit: 3) {
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
