import React, { useState } from 'react'
import {
  AspectRatio,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  Box,
} from '@chakra-ui/layout'
import { Link as GatsbyLink } from 'gatsby'
import { Image } from '@chakra-ui/image'

export default function PostCard({ post }) {
  const [isActive, setIsActive] = useState(false)

  console.log({ post })

  return (
    <LinkBox
      onMouseOver={() => setIsActive(true)}
      onMouseOut={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <Box borderColor="tealGreen.700" borderWidth="2px">
        {post?.featured_image?.url && (
          <AspectRatio ratio={16 / 9}>
            {/* <Box h="100%" w="100%"> */}
            <Image
              // as={GatsbyImage}
              h="100%"
              w="100%"
              objectFit="cover"
              style={{ mixBlendMode: 'luminosity' }}
              src={post.featured_image.url}
              alt={''}
            />
            {/* </Box> */}
          </AspectRatio>
        )}
        <Box p="4" color="tealGreen.700">
          <Heading size="xl" mb="2" lineHeight="1.2">
            <LinkOverlay as={GatsbyLink} to={`/blog/${post.slug}`}>
              {post.title}
            </LinkOverlay>
          </Heading>
          <Box>
            <Text fontWeight="semibold" mb="2">
              {post.published_at}
            </Text>
            {/* <Text fontSize="lg">{post.excerpt}</Text> */}
          </Box>
        </Box>
        <Flex
          borderTopWidth="2px"
          borderTopColor="tealGreen.700"
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
          {/* <Text fontWeight="semibold" fontSize="sm">
            (Read Time: {post.timeToRead} min)
          </Text> */}
        </Flex>
      </Box>
    </LinkBox>
  )
}
