import React from 'react'
import { graphql } from 'gatsby'
import { useInView } from 'react-intersection-observer'
import SEO from '../../components/common/SEO'
import Navbar from '../../components/global/Navbar'
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/layout'
import Footer from '../../components/global/Footer'
import PostCard from '../../components/PostCard'

export const pageQuery = graphql`
  query {
    allStrapiPost(sort: { fields: published_at, order: DESC }) {
      nodes {
        title
        slug
        id
        published_at(fromNow: true)
        # content
        featured_image {
          url
        }
      }
    }
  }
`

export default function Blog({ data }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  const {
    allStrapiPost: { nodes: posts },
  } = data

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
          <Container maxW="container.xl">
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
        <Container maxW="container.xl">
          <Grid py="24" templateColumns="repeat(12, 1fr)">
            <GridItem
              colStart={{ lg: '2', xl: '3' }}
              colSpan={{ base: '12', lg: '10', xl: '8' }}
            >
              <Grid templateColumns="repeat(12, 1fr)" gap="6">
                {posts &&
                  posts?.map((post) => (
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
