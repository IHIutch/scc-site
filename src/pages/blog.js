import React, { useState } from 'react'
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  AspectRatio,
  LinkBox,
  LinkOverlay,
  Flex,
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
                      <Post post={post} />
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

const Post = ({ post }) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <LinkBox
      onMouseOver={() => setIsActive(true)}
      onMouseOut={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <Box borderColor="tealGreen.700" borderWidth="2px">
        <AspectRatio ratio={16 / 9}>
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
        <Box p="4" color="tealGreen.700">
          <Heading size="lg" mb="2" lineHeight="1">
            <LinkOverlay as={GatsbyLink} to={post.frontmatter.slug}>
              {post.frontmatter.title}
            </LinkOverlay>
          </Heading>
          <Box>
            <Text fontWeight="semibold" mb="2">
              {post.frontmatter.date}
            </Text>
            <Text fontSize="lg">{post.excerpt}</Text>
          </Box>
        </Box>
        <Flex
          borderTop="2px"
          justify="space-between"
          align="center"
          px="4"
          py="3"
          transition="all ease 0.2s"
          sx={
            isActive
              ? { bg: 'tealGreen.700', color: 'white' }
              : { bg: 'transparent', color: 'tealGreen.700' }
          }
        >
          <Text fontFamily="crimson" fontSize="xl" fontWeight="bold">
            Keep Reading →
          </Text>
          <Text fontWeight="semibold" fontSize="sm">
            (Read Time: {post.timeToRead} min)
          </Text>
        </Flex>
      </Box>
    </LinkBox>
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
