import { useState } from 'react'
import {
  AspectRatio,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  Box,
  Icon,
  Stack,
  Img,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { Calendar, MapPin } from 'react-feather'
import { Link as RemixLink } from '@remix-run/react'

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
          <AspectRatio ratio={16 / 9} style={{ mixBlendMode: 'luminosity' }}>
            <Img
              boxSize="100%"
              objectFit="cover"
              src={post?.featuredImage?.data?.attributes?.url}
              alt={post.title}
            />
          </AspectRatio>
        )}
        <Box p="4" color="tealGreen.700">
          <Heading
            size="lg"
            mb="2"
            lineHeight="1.2"
            display="-webkit-box"
            overflow="hidden"
            sx={{
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
            }}
          >
            <LinkOverlay as={RemixLink} to={'/events/' + post.slug}>
              {post.title}
            </LinkOverlay>
          </Heading>
          <Stack>
            {post.startingAt && (
              <Stack direction="row" alignItems="center">
                <Icon boxSize="5" as={Calendar} />
                <Text fontWeight="semibold" mb="2">
                  {post.isUpcoming
                    ? dayjs(post.startingAt).format('dddd, MMM D h:mma')
                    : dayjs(post.startingAt).format('MMM D, YYYY')}
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
