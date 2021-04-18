import React from 'react'
import {
  Box,
  Flex,
  Link,
  useDisclosure,
  CloseButton,
  Icon,
  Button,
} from '@chakra-ui/react'
import Container from '../../components/common/Container'
import { Link as GatsbyLink } from 'gatsby'
import { X, Menu } from 'react-feather'

const Navbar = ({ sx }) => {
  const { isOpen, onToggle } = useDisclosure()

  const mobileBreakpoint = 'lg'

  const navItemsLeft = [
    // {
    //   name: "Reports",
    //   path: "/",
    // },
    // {
    //   name: "Alerts",
    //   path: "/alerts",
    // },
  ]

  const navItemsRight = [
    {
      name: 'Blog',
      path: '/blog',
    },
    {
      name: 'Subscribe',
      // path: '/subscribe',
    },
  ]

  return (
    <Box>
      <Box
        as="nav"
        position="fixed"
        bg={isOpen ? 'tealGreen.700' : 'transparent'}
        zIndex="1"
        top="0"
        left="0"
        right="0"
        fontFamily="crimson"
        sx={sx}
      >
        <Container>
          <Flex wrap="wrap" align="center">
            <Box>
              <Link
                as={GatsbyLink}
                d="flex"
                alignItems="center"
                px="4"
                mx="-4"
                h="16"
                _hover=""
                fontSize="2xl"
                fontWeight="bold"
                color="white"
                to="/"
              >
                Scajaquada Corridor Coalition
              </Link>
            </Box>
            <Flex align="center" ml="auto">
              <Button
                d={{ base: 'flex', [mobileBreakpoint]: 'none' }}
                to="/donate"
                px="8"
                color="tealGreen.700"
                fontSize="lg"
                fontWeight="bold"
                as={GatsbyLink}
              >
                Donate
              </Button>
              <CloseButton
                ml="4"
                size="lg"
                d={{ base: 'block', [mobileBreakpoint]: 'none' }}
                color="white"
                onClick={onToggle}
              >
                <Icon as={isOpen ? X : Menu} boxSize="8" />
              </CloseButton>
            </Flex>
            {navItemsLeft && navItemsLeft.length > 0 && (
              <Box
                ml="12"
                alignItems="stretch"
                h="100%"
                d={{
                  base: isOpen ? 'block' : 'none',
                  [mobileBreakpoint]: 'flex',
                }}
                w={{ base: 'full', [mobileBreakpoint]: 'auto' }}
              >
                {navItemsLeft.map((link, idx) => (
                  <Link
                    as={GatsbyLink}
                    key={idx}
                    to={link.path || '/'}
                    h="16"
                    d={{ base: 'flex', [mobileBreakpoint]: 'inline-flex' }}
                    _hover={{ color: { [mobileBreakpoint]: 'black' } }}
                    rounded={{ base: 'md', [mobileBreakpoint]: 'none' }}
                    fontWeight="medium"
                    fontFamily="crimson"
                    alignItems="center"
                    px={{ [mobileBreakpoint]: '8' }}
                    colorScheme="white"
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            )}
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
                  as={GatsbyLink}
                  key={idx}
                  to={link.path || '/'}
                  h="16"
                  d={{ base: 'flex', [mobileBreakpoint]: 'inline-flex' }}
                  fontWeight="medium"
                  alignItems="center"
                  px={{ base: '4', [mobileBreakpoint]: '8' }}
                  mx={{ base: '-4', [mobileBreakpoint]: '0' }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
            <Button
              d={{ base: 'none', [mobileBreakpoint]: 'flex' }}
              ml="4"
              to="/donate"
              px="8"
              color="tealGreen.700"
              fontSize="lg"
              fontWeight="bold"
              as={GatsbyLink}
            >
              Donate
            </Button>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default Navbar
