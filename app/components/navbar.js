import { X, Menu } from 'react-feather'
import {
  useDisclosure,
  Box,
  Container,
  Flex,
  Link,
  Text,
  Button,
  CloseButton,
  Icon,
} from '@chakra-ui/react'
import { trackGoal } from 'fathom-client'
import { Link as RemixLink } from '@remix-run/react'

export default function Navbar({ sx, isHeroInView }) {
  const { isOpen, onToggle } = useDisclosure()
  const handleDonateClick = () => trackGoal('VLTP3IJR')

  const mobileBreakpoint = 'lg'
  const paypalLink =
    'https://www.paypal.com/donate?hosted_button_id=FNKWNMDKXRUZG'

  const navItemsRight = [
    {
      name: 'Blog',
      path: '/blog',
    },
    {
      name: 'Events',
      path: '/events',
    },
    {
      name: 'Subscribe',
      path: 'https://eepurl.com/gnIkIv',
      isExternal: true,
    },
  ]

  return (
    <Box>
      <Box
        as="nav"
        position="fixed"
        transition="0.2s ease background-color"
        bg={!isHeroInView || isOpen ? 'tealGreen.700' : 'transparent'}
        zIndex="2"
        top="0"
        left="0"
        right="0"
        fontFamily="crimson"
        sx={sx}
      >
        <Container maxW="container.xl">
          <Flex wrap="wrap" align="center">
            <Box>
              <Link
                as={RemixLink}
                to="/"
                d="flex"
                alignItems="center"
                px="4"
                mx="-4"
                h="16"
                _hover=""
                fontSize="2xl"
                fontWeight="bold"
                color="white"
              >
                <Text as="span" d={{ base: 'none', md: 'inline' }}>
                  Scajaquada Corridor Coalition
                </Text>
                <Text as="span" d={{ base: 'flex', md: 'none' }}>
                  SCC
                </Text>
              </Link>
            </Box>
            <Flex align="center" ml="auto">
              <Button
                d={{ base: 'flex', [mobileBreakpoint]: 'none' }}
                onClick={handleDonateClick}
                href={paypalLink}
                isExternal
                px="6"
                color="tealGreen.700"
                fontSize="lg"
                fontWeight="bold"
                as={Link}
              >
                Donate
              </Button>
              <CloseButton
                ml="4"
                size="lg"
                d={{ base: 'flex', [mobileBreakpoint]: 'none' }}
                color="white"
                onClick={onToggle}
              >
                <Icon as={isOpen ? X : Menu} boxSize="6" />
              </CloseButton>
            </Flex>
            <Box
              alignItems="stretch"
              h="100%"
              d={{
                base: isOpen ? 'block' : 'none',
                [mobileBreakpoint]: 'flex',
              }}
              w={{ base: 'full', [mobileBreakpoint]: 'auto' }}
              ml="auto"
              fontFamily="crimson"
              color="white"
              fontSize="xl"
              fontWeight="bold"
            >
              {navItemsRight.map((link, idx) => (
                <Link
                  as={link.isExternal ? Link : RemixLink}
                  key={idx}
                  to={link.path}
                  href={link.path}
                  h="16"
                  d={{ base: 'flex', [mobileBreakpoint]: 'inline-flex' }}
                  fontWeight="medium"
                  alignItems="center"
                  px={{ base: '4', [mobileBreakpoint]: '8' }}
                  mx={{ base: '-4', [mobileBreakpoint]: '0' }}
                  isExternal={link.isExternal}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
            <Button
              d={{ base: 'none', [mobileBreakpoint]: 'flex' }}
              ml="4"
              href={paypalLink}
              isExternal
              px="8"
              color="tealGreen.700"
              fontSize="lg"
              fontWeight="bold"
              as={Link}
            >
              Donate
            </Button>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}
