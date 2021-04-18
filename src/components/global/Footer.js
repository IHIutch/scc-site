import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Box, Flex, Grid, GridItem, Link, Stack, Text } from '@chakra-ui/layout'
import GatsbyLink from 'gatsby-link'
import React from 'react'
import Container from '../common/Container'
import { Facebook, Instagram } from 'react-feather'
import Icon from '@chakra-ui/icon'

export default function Footer() {
  return (
    <Box as="footer" bg="tealGreen.700" py="24">
      <Container>
        <Grid templateColumns="repeat(12, 1fr)" gap="6">
          <GridItem
            d={{ base: 'none', lg: 'block' }}
            colSpan={{ base: '12', lg: '6' }}
          >
            <Stack
              direction="column"
              spacing="6"
              color="white"
              fontFamily="crimson"
              fontSize="2xl"
            >
              <Box>
                <Link as={GatsbyLink} to="/">
                  Home
                </Link>
              </Box>
              <Box>
                <Link as={GatsbyLink} to="/blog">
                  Blog
                </Link>
              </Box>
              <Box>
                <Link isExternal href="www.paypal.com">
                  Donate
                </Link>
              </Box>
            </Stack>
          </GridItem>
          <GridItem colSpan={{ base: '12', lg: '6' }}>
            <Stack
              direction="column"
              spacing="10"
              color="white"
              fontFamily="crimson"
              fontSize="2xl"
            >
              <Box>
                <FormControl id="email" color="white">
                  <FormLabel fontFamily="crimson" fontSize="2xl">
                    Subscribe to Our Newsletter
                  </FormLabel>
                  <InputGroup size="lg">
                    <Input borderWidth="2px" />
                    <InputRightElement w="auto" mr=".25rem">
                      <Button
                        color="tealGreen.700"
                        fontWeight="bold"
                        onClick={(e) => console.log(e)}
                      >
                        Subscribe
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Box>
              <Flex
                fontSize="lg"
                letterSpacing="wider"
                color="white"
                fontWeight="semibold"
                textTransform="uppercase"
              >
                <Flex
                  as={Link}
                  href="https://www.facebook.com"
                  align="center"
                  isExternal
                >
                  <Icon boxSize="6" as={Facebook} />
                  <Text ml="2">Facebook</Text>
                </Flex>
                <Flex
                  as={Link}
                  href="https://www.instagram.com"
                  ml="12"
                  align="center"
                  isExternal
                >
                  <Icon boxSize="6" as={Instagram} />
                  <Text ml="2">Instagram</Text>
                </Flex>
              </Flex>
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}
