import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Link,
  Stack,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
} from '@chakra-ui/react'
import { Facebook, Twitter } from 'react-feather'
import { trackGoal } from 'fathom-client'
import { Link as RemixLink } from '@remix-run/react'

export default function Footer({ SITE_META }) {
  const handleDonateClick = () => trackGoal('VLTP3IJR')

  return (
    <Box as="footer" bg="tealGreen.700" py="24">
      <Container maxW="container.xl">
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
                <Link as={RemixLink} to="/">
                  Home
                </Link>
              </Box>
              <Box>
                <Link as={RemixLink} to="/blog">
                  Blog
                </Link>
              </Box>
              <Box>
                <Link as={RemixLink} to="/events">
                  Events
                </Link>
              </Box>
              <Box>
                <Link
                  href="https://www.paypal.com/donate?hosted_button_id=FNKWNMDKXRUZG"
                  onClick={handleDonateClick}
                  isExternal
                >
                  Donate
                </Link>
              </Box>
            </Stack>
          </GridItem>
          <GridItem colSpan={{ base: '12', md: '9', lg: '6' }}>
            <Stack
              direction="column"
              spacing="10"
              color="white"
              fontFamily="crimson"
              fontSize="2xl"
            >
              <Box>
                {/* <!-- Begin Mailchimp Signup Form --> */}
                <div id="mc_embed_signup">
                  <form
                    action="https://sccoalition.us18.list-manage.com/subscribe/post?u=51f05a4ccef31c3fd7476eb6f&amp;id=b0bef5e224"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    target="_blank"
                  >
                    <div id="mc_embed_signup_scroll">
                      <div>
                        <FormControl id="mce-EMAIL" color="white">
                          <FormLabel fontFamily="crimson" fontSize="2xl">
                            Subscribe to Our Newsletter
                          </FormLabel>
                          <InputGroup size="lg">
                            <Input borderWidth="2px" name="EMAIL" isRequired />
                            <InputRightElement w="auto" mr=".25rem">
                              <Button
                                type="submit"
                                color="tealGreen.700"
                                fontSize="lg"
                                fontWeight="bold"
                              >
                                Subscribe
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
                      </div>
                      <div id="mce-responses">
                        <div
                          id="mce-error-response"
                          style={{ display: 'none' }}
                        ></div>
                        <div
                          id="mce-success-response"
                          style={{ display: 'none' }}
                        ></div>
                      </div>
                      {/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
                      <div
                        style={{ position: 'absolute', left: '-5000px' }}
                        aria-hidden="true"
                      >
                        <input
                          type="text"
                          name="b_51f05a4ccef31c3fd7476eb6f_b0bef5e224"
                          tabIndex="-1"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                {/* <!--End mc_embed_signup--> */}
              </Box>
              <Flex
                fontSize="lg"
                letterSpacing="wider"
                color="white"
                fontWeight="semibold"
                textTransform="uppercase"
              >
                <Link as={RemixLink} to={SITE_META.facebookUrl} isExternal>
                  <Flex align="center">
                    <Icon boxSize="6" as={Facebook} />
                    <Text ml="2">Facebook</Text>
                  </Flex>
                </Link>
                <Link as={RemixLink} to={SITE_META.twitterUrl} isExternal>
                  <Flex ml="12" align="center">
                    <Icon boxSize="6" as={Twitter} />
                    <Text ml="2">Twitter</Text>
                  </Flex>
                </Link>
              </Flex>
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}
