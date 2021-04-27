import React from 'react'
import { Helmet } from 'react-helmet'
import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import Navbar from '../components/global/Navbar'
import Container from '../components/common/Container'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Footer from '../components/global/Footer'
import { useInView } from 'react-intersection-observer'

export default function Post({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const featuredImg = getImage(frontmatter.featuredImage)

  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  return (
    <>
      <Helmet>
        <title>{frontmatter.title}</title>
      </Helmet>
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
          <Box mt="auto" w="100%" mb="12" position="relative">
            <Container>
              <Grid py="6" templateColumns="repeat(12, 1fr)" gap="6">
                <GridItem
                  colStart={{ lg: '2', xl: '3' }}
                  colSpan={{ base: '12', lg: '10', xl: '8' }}
                >
                  <Box borderBottomWidth="1px" borderColor="white" pb="8">
                    <Heading size="3xl" mb="2" color="white" lineHeight="1.125">
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
                  <Box mt="6">
                    <Text
                      color="white"
                      fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                      fontFamily="crimson"
                      lineHeight="1.25"
                    >
                      {frontmatter.lead}
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
            </Container>
          </Box>
        </Flex>
        <Container>
          <Grid py="32" templateColumns="repeat(12, 1fr)" gap="6">
            <GridItem colStart={{ lg: '3' }} colSpan={{ base: '12', lg: '8' }}>
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: html }}
              ></div>
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
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
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
