import type { FlexProps } from '@chakra-ui/react'
import { Box, Flex, Icon, IconButton, Stack, Text } from '@chakra-ui/react'
import { Facebook, Twitter } from 'react-feather'
import {
  FacebookShareButton,
  TwitterShareButton,
} from '~/components/shareButtons'

type ShareContainerProps = FlexProps & {
  label: string
  title: string
  url: string
}

export default function ShareContainer({ label, title, url, ...props }: ShareContainerProps) {
  return (
    <Flex {...props} justifyContent={{ lg: 'flex-end' }}>
      <Box>
        <Text
          fontSize="sm"
          color="teal.700"
          textTransform="uppercase"
          fontWeight="semibold"
          letterSpacing="wider"
          mt="6"
          mb="2"
        >
          {label}
        </Text>
        <Stack direction="row" justifyContent={{ lg: 'center' }}>
          <FacebookShareButton
            as={IconButton}
            colorScheme="teal"
            bg="teal.700"
            borderRadius="full"
            boxSize="10"
            icon={<Icon as={Facebook} />}
            aria-label="Share this event on Facebook"
            url={url}
            text={title}
          />
          <TwitterShareButton
            as={IconButton}
            colorScheme="teal"
            bg="teal.700"
            borderRadius="full"
            boxSize="10"
            icon={<Icon as={Twitter} />}
            aria-label="Share this event on Twitter"
            url={url}
            text={title}
          />
        </Stack>
      </Box>
    </Flex>
  )
}
