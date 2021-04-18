import React from 'react'
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  AspectRatio,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import { Helmet } from 'react-helmet'
import Container from '../components/common/Container'
import Navbar from '../components/global/Navbar'
import { graphql } from 'gatsby'
import GatsbyLink from 'gatsby-link'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Footer from '../components/global/Footer'

export default function Blog({ data }) {
  const { allMarkdownRemark } = data
  const { nodes } = allMarkdownRemark

  return (
    <>
      <Helmet>
        <title>Scajaquada Corridor Coalition</title>
      </Helmet>
      <Navbar />
      <main>
        <Box bg="tealGreen.700" pt="32">
          <Container>
            <Grid pb="20" templateColumns="repeat(12, 1fr)">
              <GridItem
                colStart={{ lg: '2', xl: '3' }}
                colSpan={{ base: '12', lg: '10', xl: '8' }}
              >
                <Box borderBottomWidth="1px" borderColor="white">
                  <Heading size="3xl" mb="8" color="white" lineHeight="1.125">
                    Blog
                  </Heading>
                </Box>
                <Box mt="6">
                  <Text
                    color="white"
                    fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                    fontFamily="crimson"
                    lineHeight="1.25"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Text>
                </Box>
              </GridItem>
            </Grid>
          </Container>
        </Box>
        <Container>
          <Grid py="6" templateColumns="repeat(12, 1fr)">
            <GridItem
              colStart={{ lg: '2', xl: '3' }}
              colSpan={{ base: '12', lg: '10', xl: '8' }}
            >
              <Grid py="32" templateColumns="repeat(12, 1fr)" gap="6">
                {nodes &&
                  nodes.length > 0 &&
                  nodes.map((post) => (
                    <GridItem key={post.id} colSpan={{ base: '12', md: '6' }}>
                      <LinkBox>
                        <AspectRatio ratio={16 / 9} mb="4">
                          <Box h="100%" w="100%">
                            <Box
                              as={GatsbyImage}
                              h="100%"
                              w="100%"
                              objectFit="cover"
                              style={{ mixBlendMode: 'luminosity' }}
                              image={getImage(post.frontmatter.featuredImage)}
                              alt={''}
                            />
                          </Box>
                        </AspectRatio>
                        <Box>
                          <Heading size="md" mb="2">
                            <LinkOverlay
                              as={GatsbyLink}
                              to={post.frontmatter.slug}
                            >
                              {post.frontmatter.title}
                            </LinkOverlay>
                          </Heading>
                          <Box>
                            <Text>{post.excerpt}</Text>
                          </Box>
                        </Box>
                      </LinkBox>
                    </GridItem>
                  ))}
              </Grid>
            </GridItem>
          </Grid>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export const pageQuery = graphql`
  query AllPosts {
    allMarkdownRemark {
      nodes {
        id
        excerpt
        timeToRead
        frontmatter {
          title
          date
          slug
          featuredImage {
            childImageSharp {
              gatsbyImageData(
                width: 400
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`
