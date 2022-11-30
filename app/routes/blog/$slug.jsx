import React from 'react'
import { getPost, getPosts } from 'utils/axios/posts'

import Navbar from '~/components/navbar'
import {
  Alert,
  AlertIcon,
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

import dayjs from 'dayjs'
import PostCard from '~/components/postCard'
import ShareContainer from '~/components/shareContainer'
import { json } from '@remix-run/node'
import { useLoaderData, Link as RemixLink, useLocation } from '@remix-run/react'
import Markdoc from '@markdoc/markdoc'

export default function BlogPost() {
  const { post, posts, preview, SITE_META } = useLoaderData()
  const { pathname } = useLocation()

  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  return (
    <>
      {/* <SEO
        title={post?.title}
        description={post?.lead}
        slug={`/blog/${post?.slug}`}
        image={post?.featuredImage?.data?.attributes?.url}
      /> */}
      {preview && (
        <Box position="fixed" top="0" left="0" right="0" zIndex="2">
          <Alert status="info">
            <AlertIcon />
            <Text>
              This page is a preview.{' '}
              <Link
                href="/api/exit-preview"
                fontWeight="semibold"
                textDecoration="underline"
              >
                Click here
              </Link>{' '}
              to exit preview mode.
            </Text>
          </Alert>
        </Box>
      )}
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
                      {post?.title}
                    </Heading>
                    {post?.publishedAt && (
                      <Text color="white" fontSize="xl" fontFamily="crimson">
                        {dayjs(post.publishedAt).format('MMMM D, YYYY')}
                      </Text>
                    )}
                  </Box>
                  {post?.lead && (
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
        <Container maxW="container.xl" pt="16" pb="32">
          <Grid templateColumns="repeat(12, 1fr)" gap="6">
            <GridItem colStart={{ lg: '3' }} colSpan={{ base: '12', lg: '8' }}>
              <ShareContainer
                label="Share this post"
                url={SITE_META.siteUrl + pathname}
                title={post.title}
                mb="8"
              />
              <Box className="post-content">
                {Markdoc.renderers.react(post.content, React, {
                  components: {
                    img: (props) => <Image width="100%" {...props} />,
                  },
                })}
              </Box>
              <Box
                borderTopWidth="2px"
                borderBottomWidth="2px"
                borderColor="tealGreen.800"
                my="24"
                py="12"
              >
                <Text fontFamily="crimson" fontSize="3xl" color="tealGreen.700">
                  Support the removal of the Scajaquada Expressway by following
                  us on{' '}
                  <Link
                    as={RemixLink}
                    to={SITE_META.twitterUrl}
                    fontWeight="bold"
                    textDecoration="underline"
                    isExternal
                  >
                    Twitter
                  </Link>{' '}
                  and{' '}
                  <Link
                    as={RemixLink}
                    to={SITE_META.facebookUrl}
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
          {posts.length > 0 ? (
            <Box borderColor="tealGreen.700">
              <Flex alignItems="baseline">
                <Heading mb="8" color="tealGreen.700">
                  Our Latest Posts
                </Heading>
                <Link
                  as={RemixLink}
                  to="/blog"
                  d="flex"
                  textDecoration="underline"
                  fontWeight="semibold"
                  color="tealGreen.700"
                  ml="4"
                >
                  See All Posts →
                </Link>
              </Flex>
              <Grid templateColumns="repeat(12, 1fr)" gap="6">
                {posts.map((post, idx) => (
                  <GridItem
                    key={idx}
                    colSpan={{ base: '12', md: '6', lg: '4' }}
                  >
                    <PostCard post={post} />
                  </GridItem>
                ))}
              </Grid>
            </Box>
          ) : null}
        </Container>
      </main>
    </>
  )
}

export const loader = async ({ params, preview = false }) => {
  const { data } = await getPosts({
    publicationState: preview ? 'preview' : 'live',
  })
  const foundPost = data.find((post) => post.attributes.slug === params.slug)

  if (!foundPost) {
    return {
      notFound: true,
    }
  }

  const { data: postsData } = await getPosts({
    publicationState: preview ? 'preview' : 'live',
  })

  const posts = postsData
    .filter((post) => post.id !== foundPost.id)
    .map((post) => ({
      title: post.attributes.title,
      slug: post.attributes.slug,
      publishedAt: post.attributes.publishedAt,
      featuredImage: post.attributes.featuredImage,
    }))
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 3)

  const {
    data: { attributes: post },
  } = await getPost(foundPost.id)

  const ast = Markdoc.parse(post.content)
  post.content = Markdoc.transform(ast)

  return json({
    post,
    posts,
    preview,
    SITE_META: {
      twitterUrl: 'https://twitter.com/RightSize198',
      facebookUrl: 'https://www.facebook.com/sccbuffalo/',
      siteUrl: process.env.SITE_URL,
    },
  })
}
