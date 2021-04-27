import React from 'react'
import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import Container from '../components/common/Container'
import Navbar from '../components/global/Navbar'
import { graphql } from 'gatsby'
import Footer from '../components/global/Footer'
import { useInView } from 'react-intersection-observer'
import SEO from '../components/common/SEO'
import PostCard from '../components/PostCard'

export default function Blog({ data }) {
  const { allMarkdownRemark } = data
  const { nodes } = allMarkdownRemark
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  return (
    <>
      <SEO
        post={{
          title: 'Blog',
          description:
            'Stay up to date on the latest updates of our mission: Creating a better Buffalo through community collaboration and strategic thinking.',
        }}
      />
      <Navbar isHeroInView={inView} />
      <main>
        <Box bg="tealGreen.700" pt="32" ref={ref}>
          <Container>
            <Grid pb="20" templateColumns="repeat(12, 1fr)">
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
                    Blog
                  </Heading>
                </Box>
                <Box mt="6">
                  <Text
                    color="white"
                    fontSize="3xl"
                    fontFamily="crimson"
                    lineHeight="1.25"
                  >
                    Stay up to date on the latest updates of our mission:
                    Creating a better Buffalo through community collaboration
                    and strategic thinking.
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
                      <PostCard post={post} />
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
