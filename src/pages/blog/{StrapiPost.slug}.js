import React from 'react'
import { graphql } from 'gatsby'
import Navbar from '../../components/global/Navbar'
import { useInView } from 'react-intersection-observer'
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
import { GatsbyImage } from 'gatsby-plugin-image'
import SEO from '../../components/common/SEO'
import Footer from '../../components/global/Footer'
import ReactMarkdown from 'react-markdown'

export const query = graphql`
  query($id: String) {
    strapiPost(id: { eq: $id }) {
      slug
      title
      published_at(formatString: "MMMM DD, YYYY")
      # lead
      content
    }
    site {
      siteMetadata {
        twitterUrl
        facebookUrl
      }
    }
  }
`

export default function Post({ data }) {
  const {
    strapiPost: post,
    site: {
      siteMetadata: { twitterUrl, facebookUrl },
    },
  } = data

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
              as={GatsbyImage}
              w="100%"
              h="100%"
              objectFit="cover"
              opacity="20%"
              style={{ mixBlendMode: 'luminosity' }}
              // image={featuredImg}
              alt={''}
            />
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
                      {post.title}
                    </Heading>
                    <Text
                      as="span"
                      color="white"
                      fontSize="xl"
                      fontFamily="crimson"
                    >
                      {post.meta && (
                        <>
                          <Text as="span">{post.meta}</Text>
                          <Text as="span" mx="3">
                            |
                          </Text>
                        </>
                      )}
                      {post.published_at}
                    </Text>
                  </Box>
                  {post.lead && (
                    <Box borderTopWidth="1px" borderColor="white" pt="8" mt="8">
                      <Text
                        color="white"
                        fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                        fontFamily="crimson"
                        lineHeight="1.25"
                      >
                        {post.lead}
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
              <ProseContent>{post.content}</ProseContent>
              <Box
                borderTopWidth="2px"
                borderTopColor="tealGreen.800"
                mt="24"
                pt="12"
              >
                <Text fontFamily="crimson" fontSize="3xl" color="tealGreen.700">
                  Support the removal of the Scajaquada Expressway by following
                  us on{' '}
                  <Link
                    href={twitterUrl}
                    fontWeight="bold"
                    textDecoration="underline"
                    isExternal
                  >
                    Twitter
                  </Link>{' '}
                  and{' '}
                  <Link
                    href={facebookUrl}
                    fontWeight="bold"
                    textDecoration="underline"
                    isExternal
                  >
                    Facebook
                  </Link>
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

const ProseContent = ({ children }) => {
  const proseTheme = {
    h1: {
      fontSize: '6xl',
      fontWeight: 'bold',
      fontFamily: 'crimson',
      color: 'tealGreen.800',
      mt: '12',
      mb: '4',
      lineHeight: '1.2',
    },
    h2: {
      fontSize: '5xl',
      fontWeight: 'bold',
      fontFamily: 'crimson',
      color: 'tealGreen.800',
      mt: '12',
      mb: '4',
      lineHeight: '1.2',
    },
    h3: {
      fontSize: '4xl',
      fontWeight: 'bold',
      fontFamily: 'crimson',
      color: 'tealGreen.800',
      mt: '12',
      mb: '4',
      lineHeight: '1.2',
    },
    p: {
      fontSize: {
        base: 'xl',
        lg: '2xl',
      },
      lineHeight: '2',
      color: 'tealGreen.700',
    },
    'p + p': {
      mt: '12',
    },
    a: {
      fontWeight: 'bold',
      textDecoration: 'underline',
    },
    'p > a': {
      fontWeight: 'bold',
      textDecoration: 'underline',
    },
    'blockquote > p': {
      textAlign: 'center',
      fontSize: '4xl',
      fontWeight: 'bold',
      fontFamily: 'crimson',
      color: 'tealGreen.800',
      my: '16',
      lineHeight: '1.4',
    },
    hr: {
      my: '12',
      borderTopColor: 'tealGreen.800',
      borderTopWidth: '2px',
    },
    ul: {
      mt: '6',
      mb: '12',
      pl: '8',
      fontSize: {
        base: 'lg',
        lg: 'xl',
      },
      lineHeight: '1.6',
      color: 'tealGreen.800',
    },
    '* + ul li': {
      mt: '4',
    },
  }
  return (
    <Box sx={proseTheme}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </Box>
  )
}
