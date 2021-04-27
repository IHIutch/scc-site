import React from 'react'
import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'
import Container from '../components/common/Container'
import Navbar from '../components/global/Navbar'
import bgImage from '../images/delaware_full1.webp'
import Footer from '../components/global/Footer'
import { StaticImage } from 'gatsby-plugin-image'
import aRender from '../assets/images/web/a_render.jpg'
import bRender from '../assets/images/web/b_render.jpg'
import cRender from '../assets/images/web/c_render.jpg'
import dRender from '../assets/images/web/d_render.jpg'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Scajaquada Corridor Coalition</title>
      </Helmet>
      <Navbar />
      <main>
        <Flex
          w="100%"
          minH={{ base: '90vh', lg: '75vh' }}
          bg="tealGreen.700"
          position="relative"
          _before={{
            content: "''",
            position: 'absolute',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
            bg: 'tealGreen.700',
            backgroundBlendMode: 'luminosity',
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            opacity: '20%',
          }}
        >
          <Box mt="auto" w="100%" mb="12" position="relative">
            <Container>
              <Grid py="6" templateColumns="repeat(12, 1fr)" gap="6">
                <GridItem
                  colStart={{ lg: '2', xl: '3' }}
                  colSpan={{ base: '12', lg: '10', xl: '8' }}
                >
                  <Box borderBottomWidth="1px" borderColor="white">
                    <Heading size="3xl" mb="8" color="white" lineHeight="1.125">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Heading>
                  </Box>
                  <Box mt="6">
                    <Text
                      color="white"
                      fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                      fontFamily="crimson"
                      lineHeight="1.25"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
            </Container>
          </Box>
        </Flex>
        <Container>
          <Grid
            py={{ base: '16', lg: '32' }}
            templateColumns="repeat(12, 1fr)"
            gap="6"
          >
            <GridItem colStart={{ lg: '3' }} colSpan={{ base: '12', lg: '8' }}>
              <Box>
                <Text
                  fontSize={{ base: 'xl', lg: '2xl' }}
                  lineHeight="2"
                  color="tealGreen.700"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Text>
              </Box>
            </GridItem>
          </Grid>
          <Box>
            <StaticImage
              src="../assets/images/web/a_render.jpg"
              alt=""
              placeholder="blurred"
            />
          </Box>
          <Grid
            py={{ base: '16', lg: '32' }}
            templateColumns="repeat(12, 1fr)"
            gap="6"
          >
            <GridItem colStart={{ lg: '3' }} colSpan={{ base: '12', lg: '8' }}>
              <Box>
                <Text
                  fontSize={{ base: 'xl', lg: '2xl' }}
                  lineHeight="2"
                  color="tealGreen.700"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Text>
              </Box>
            </GridItem>
          </Grid>
          <Box>
            <StaticImage
              src="../assets/images/web/b_render.jpg"
              alt=""
              placeholder="blurred"
            />
          </Box>
          <Grid
            py={{ base: '16', lg: '32' }}
            templateColumns="repeat(12, 1fr)"
            gap="6"
          >
            <GridItem colStart={{ lg: '3' }} colSpan={{ base: '12', lg: '8' }}>
              <Box>
                <Text
                  fontSize={{ base: 'xl', lg: '2xl' }}
                  lineHeight="2"
                  color="tealGreen.700"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Text>
              </Box>
            </GridItem>
          </Grid>
          <Box>
            <StaticImage
              src="../assets/images/web/c_render.jpg"
              alt=""
              placeholder="blurred"
            />
          </Box>
          <Grid
            py={{ base: '16', lg: '32' }}
            templateColumns="repeat(12, 1fr)"
            gap="6"
          >
            <GridItem colStart={{ lg: '3' }} colSpan={{ base: '12', lg: '8' }}>
              <Box>
                <Text
                  fontSize={{ base: 'xl', lg: '2xl' }}
                  lineHeight="2"
                  color="tealGreen.700"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Text>
              </Box>
            </GridItem>
          </Grid>
          <Box mb="32">
            <StaticImage
              src="../assets/images/web/d_render.jpg"
              alt=""
              placeholder="blurred"
            />
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  )
}
