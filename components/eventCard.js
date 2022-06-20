import React, { useState } from 'react'
import {
  AspectRatio,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  Box,
  HStack,
  Icon,
  Stack,
} from '@chakra-ui/react'
import { Image } from '@chakra-ui/image'
import NextLink from 'next/link'
import dayjs from 'dayjs'
import NextImage from 'next/image'
import { Calendar, MapPin } from 'react-feather'

export default function EventCard({ post }) {
  const [isActive, setIsActive] = useState(false)

  return (
    <LinkBox
      as="article"
      onMouseOver={() => setIsActive(true)}
      onMouseOut={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <Box borderColor="tealGreen.700" borderWidth="2px">
        {post?.featuredImage?.data && (
          <AspectRatio ratio={16 / 9}>
            <Box h="100%" w="100%" style={{ mixBlendMode: 'luminosity' }}>
              <Image
                as={NextImage}
                layout="fill"
                objectFit="cover"
                src={post?.featuredImage?.data?.attributes?.url}
                alt={post.title}
              />
            </Box>
          </AspectRatio>
        )}
        <Box p="4" color="tealGreen.700">
          <Heading
            size="lg"
            mb="2"
            lineHeight="1.2"
            sx={{
              display: '-webkit-box',
              '-webkit-line-clamp': '3',
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden',
            }}
          >
            <NextLink
              href={{
                pathname: '/events/[slug]',
                query: { slug: post.slug },
              }}
              passHref
            >
              <LinkOverlay>{post.title}</LinkOverlay>
            </NextLink>
          </Heading>
          <Stack>
            {post.startingAt && (
              <Stack direction="row" alignItems="center">
                <Icon boxSize="5" as={Calendar} />
                <Text fontWeight="semibold" mb="2">
                  {dayjs(post.startingAt).format('dddd, MMMM D h:mma')}
                </Text>
              </Stack>
            )}
            {post.location?.title && (
              <Stack direction="row" alignItems="center">
                <Icon boxSize="5" as={MapPin} />
                <Text fontWeight="semibold" mb="2">
                  {post.location.title}
                </Text>
              </Stack>
            )}
          </Stack>
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
            View Event Details →
          </Text>
        </Flex>
      </Box>
    </LinkBox>
  )
}
