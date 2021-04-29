import React from 'react'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react'
import { graphql } from 'gatsby'
import Navbar from '../components/global/Navbar'
import Container from '../components/common/Container'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Footer from '../components/global/Footer'
import { useInView } from 'react-intersection-observer'
import SEO from '../components/common/SEO'
import { MDXRenderer } from 'gatsby-plugin-mdx'

export default function Post({ data }) {
  const {
    mdx,
    site: {
      siteMetadata: { twitterUrl, facebookUrl },
    },
  } = data
  const { frontmatter, body } = mdx
  const featuredImg = getImage(frontmatter.featuredImage)

  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  return (
    <>
      <SEO post={{ title: frontmatter.title, description: frontmatter.lead }} />
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
              image={featuredImg}
              alt={''}
            />
          </Box>
          <Box mt="auto" pt="5" w="100%" mb="12" position="relative">
            <Container>
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
                      {frontmatter.title}
                    </Heading>
                    <Text
                      as="span"
                      color="white"
                      fontSize="xl"
                      fontFamily="crimson"
                    >
                      {frontmatter.meta && (
                        <>
                          <Text as="span">{frontmatter.meta}</Text>
                          <Text as="span" mx="3">
                            |
                          </Text>
                        </>
                      )}
                      {frontmatter.date}
                    </Text>
                  </Box>
                  {frontmatter.lead && (
                    <Box borderTopWidth="1px" borderColor="white" pt="8" mt="8">
                      <Text
                        color="white"
                        fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                        fontFamily="crimson"
                        lineHeight="1.25"
                      >
                        {frontmatter.lead}
                      </Text>
                    </Box>
                  )}
                </GridItem>
              </Grid>
            </Container>
          </Box>
        </Flex>
        <Container>
          <Grid py="32" templateColumns="repeat(12, 1fr)" gap="6">
            <GridItem colStart={{ lg: '3' }} colSpan={{ base: '12', lg: '8' }}>
              <Box className="post-content">
                <MDXRenderer>{body}</MDXRenderer>
              </Box>
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

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        twitterUrl
        facebookUrl
      }
    }
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        lead
        meta
        featuredImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
          }
        }
      }
    }
  }
`
