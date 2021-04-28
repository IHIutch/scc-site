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
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link as GatsbyLink } from 'gatsby'

export default function PostCard({ post }) {
  const [isActive, setIsActive] = useState(false)

  return (
    <LinkBox
      onMouseOver={() => setIsActive(true)}
      onMouseOut={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <Box borderColor="tealGreen.700" borderWidth="2px">
        {post.frontmatter.featuredImage && (
          <AspectRatio ratio={16 / 9}>
            <Box h="100%" w="100%">
              <Box
                as={GatsbyImage}
                h="100%"
                w="100%"
                objectFit="cover"
                style={{ mixBlendMode: 'luminosity' }}
                image={getImage(post.frontmatter.featuredImage)}
                alt={''}
              />
            </Box>
          </AspectRatio>
        )}
        <Box p="4" color="tealGreen.700">
          <Heading size="xl" mb="2" lineHeight="1.2">
            <LinkOverlay as={GatsbyLink} to={post.frontmatter.slug}>
              {post.frontmatter.title}
            </LinkOverlay>
          </Heading>
          <Box>
            <Text fontWeight="semibold" mb="2">
              {post.frontmatter.date}
            </Text>
            <Text fontSize="lg">{post.excerpt}</Text>
          </Box>
        </Box>
        <Flex
          borderTop="2px"
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
          <Text fontWeight="semibold" fontSize="sm">
            (Read Time: {post.timeToRead} min)
          </Text>
        </Flex>
      </Box>
    </LinkBox>
  )
}
