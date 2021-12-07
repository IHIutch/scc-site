import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import PostCard from '@/components/postCard'
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/layout'
import React from 'react'
import { useInView } from 'react-intersection-observer'

export default function BlogArchive({ posts }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  return (
    <>
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
          <Grid py="24" templateColumns="repeat(12, 1fr)">
            <GridItem
              colStart={{ lg: '2', xl: '3' }}
              colSpan={{ base: '12', lg: '10', xl: '8' }}
            >
              <Grid templateColumns="repeat(12, 1fr)" gap="6">
                {posts.map((post) => (
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

export async function getStaticProps() {
  return {
    props: {
      posts: [],
    },
  }
}