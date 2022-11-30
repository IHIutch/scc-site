import { Box, Heading, Link, Text } from '@chakra-ui/react'

export default function Attribution({ title, author, source }) {
  return (
    <Box my="12">
      <Box mb="2">
        <Text fontWeight="semibold" color="tealGreen.700">
          Originally posted by:{' '}
          <Link textDecor="underline" href={source.link} isExternal>
            {source.name}
          </Link>
        </Text>
      </Box>
      <Heading
        fontSize="5xl"
        fontWeight="bold"
        fontFamily="crimson"
        color="tealGreen.800"
        mb="4"
        lineHeight="1"
      >
        {title}
      </Heading>
      <Text fontSize="md" color="tealGreen.700">
        {author}
      </Text>
    </Box>
  )
}
