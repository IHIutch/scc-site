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

const Navbar = ({ sx }) => {
  const { isOpen, onToggle } = useDisclosure()

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
      path: '/subscribe',
    },
  ]

  return (
    <Box>
      <Box
        as="nav"
        bg="transparent"
        position="fixed"
        zIndex="1"
        top="0"
        left="0"
        right="0"
        sx={sx}
      >
        <Container>
          <Flex wrap="wrap" align="center">
            <Box mr="12">
              <Link
                as={GatsbyLink}
                d="flex"
                alignItems="center"
                px="4"
                mx="-4"
                h="16"
                _hover=""
                fontSize="lg"
                fontWeight="bold"
                color="white"
              >
                Scajaquada Corridor Coalition
              </Link>
            </Box>
            <CloseButton
              ml="auto"
              d={{ base: 'block', md: 'none' }}
              onClick={onToggle}
            >
              {/* <Icon as={isOpen ? X : Menu} h="6" w="6" /> */}
            </CloseButton>
            {navItemsLeft && navItemsLeft.length > 0 && (
              <Box
                alignItems="stretch"
                h="100%"
                d={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
                w={{ base: 'full', md: 'auto' }}
              >
                {navItemsLeft.map((link, idx) => (
                  <Link
                    as={GatsbyLink}
                    key={idx}
                    to={link.path}
                    h="16"
                    d={{ base: 'flex', md: 'inline-flex' }}
                    _hover={{ color: { md: 'black' } }}
                    rounded={{ base: 'md', md: 'none' }}
                    fontWeight="medium"
                    alignItems="center"
                    px="4"
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
              d={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
              w={{ base: 'full', md: 'auto' }}
              ml="auto"
            >
              {navItemsRight.map((link, idx) => (
                <Link
                  as={GatsbyLink}
                  key={idx}
                  to={link.path}
                  h="16"
                  d={{ base: 'flex', md: 'inline-flex' }}
                  fontWeight="medium"
                  alignItems="center"
                  px="8"
                  color="white"
                >
                  {link.name}
                </Link>
              ))}
            </Box>
            <Flex align="center" ml="4">
              <Button to="/donate" px="8" as={GatsbyLink}>
                Donate
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default Navbar
