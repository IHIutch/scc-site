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
  Link,
  Text,
  Img,
} from '@chakra-ui/react'
import { useInView } from 'react-intersection-observer'

import dayjs from 'dayjs'
import PostCard from '~/components/postCard'
import ShareContainer from '~/components/shareContainer'
import { json } from '@remix-run/node'
import {
  useLoaderData,
  Link as RemixLink,
  useLocation,
  useOutletContext,
} from '@remix-run/react'
import Markdoc from '@markdoc/markdoc'
import b_render from 'public/assets/images/b_render.jpg'
import { parseMarkdown } from '~/models/articles.server'
import { notFound } from 'remix-utils'
import { getSEO } from 'utils/seo'

export const meta = ({ data }) => {
  const SEO = getSEO({
    title: data.post?.title,
    image: data.post?.featuredImage?.data?.attributes?.url,
  })

  return {
    ...SEO,
  }
}

export default function BlogPost() {
  const { post, posts, preview } = useLoaderData()
  const { pathname } = useLocation()
  const { SITE_META } = useOutletContext()

  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  return (
    <>
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
            <Img
              style={{ mixBlendMode: 'luminosity' }}
              opacity="20%"
              boxSize="100%"
              objectFit="cover"
              src={post?.featuredImage?.data?.attributes?.url || b_render}
              alt={post.title}
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
                    Image: (props) => <Img width="100%" {...props} />,
                    ExternalLink: (props) => {
                      return (
                        <a
                          href={props.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {props.children}
                        </a>
                      )
                    },
                    InternalLink: (props) => {
                      return (
                        <RemixLink to={props.pathname}>
                          {props.children}
                        </RemixLink>
                      )
                    },
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
                    to={SITE_META.twitterUrl}
                    fontWeight="bold"
                    textDecoration="underline"
                    isExternal
                  >
                    Twitter
                  </Link>{' '}
                  and{' '}
                  <Link
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
    throw notFound({ message: 'Blog post not found' })
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

  post.content = parseMarkdown(post.content)

  return json({
    post,
    posts,
    preview,
  })
}
