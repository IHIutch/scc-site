import React from 'react'
import { getPost, getPosts } from '@/utils/axios/posts'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/react'
import { useInView } from 'react-intersection-observer'
import NextLink from 'next/link'
import NextImage from 'next/image'

import { SEO } from '@/components/seo'
import dayjs from 'dayjs'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

export default function BlogPost({ post }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  return (
    <>
      <SEO
        post={{
          ...post,
          title: post.title,
          description: post?.lead,
          slug: `/blog/${post.slug}`,
        }}
      />
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
            {post?.featuredImage?.data && (
              <Box
                style={{ mixBlendMode: 'luminosity' }}
                opacity="20%"
                w="100%"
                h="100%"
              >
                <Image
                  as={NextImage}
                  priority={true}
                  layout="fill"
                  objectFit="cover"
                  src={post?.featuredImage?.data?.attributes?.url}
                  alt={post.title}
                />
              </Box>
            )}
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
                      {post.publishedAt && (
                        <Text>
                          {dayjs(post.publishedAt).format('MMMM D, YYYY')}
                        </Text>
                      )}
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
              <Box className="post-content">
                <MDXRemote
                  {...post.content}
                  components={{
                    // eslint-disable-next-line jsx-a11y/alt-text
                    img: (props) => <Image width="100%" {...props} />,
                  }}
                />
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
                  <NextLink href={process.env.SITE_META.twitterUrl} passHref>
                    <Link
                      href={process.env.SITE_META.twitterUrl}
                      fontWeight="bold"
                      textDecoration="underline"
                      isExternal
                    >
                      Twitter
                    </Link>
                  </NextLink>{' '}
                  and{' '}
                  <NextLink href={process.env.SITE_META.facebookUrl} passHref>
                    <Link
                      href={process.env.SITE_META.facebookUrl}
                      fontWeight="bold"
                      textDecoration="underline"
                      isExternal
                    >
                      Facebook
                    </Link>
                  </NextLink>
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

export async function getStaticPaths() {
  const { data } = await getPosts()

  const paths = data.map((post) => ({
    params: {
      slug: post.attributes.slug,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const { data } = await getPosts()
  const foundPost = data.find((post) => post.attributes.slug === params.slug)

  if (!foundPost) {
    return {
      notFound: true,
    }
  }

  const {
    data: { attributes: post },
  } = await getPost(foundPost.id)

  post.content = await serialize(post.content)

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 24,
  }
}
