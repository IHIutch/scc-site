import {
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Img,
  Box,
} from '@chakra-ui/react'
import { useInView } from 'react-intersection-observer'
import Navbar from '~/components/navbar'
import delaware_full1 from 'public/assets/images/delaware_full1.webp'
import { getSEO } from 'utils/seo'

export const meta = ({ data }) => {
  const SEO = getSEO({
    title:
      "Sign the Letter of Support for GBNRTC's Proposed Scenario for the Scajaquada Corridor!",
    description:
      'The Scajaquada Corridor Coalition (SCC) promotes and advocates for a comprehensive, community-inspired design alternative for the Scajaquada Creek Corridor.',
  })

  return {
    ...SEO,
  }
}

export default function SupportPage() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  return (
    <>
      <Navbar isHeroInView={inView} />
      <main>
        <Flex
          w="100%"
          minH={{ base: '90vh', lg: '75vh' }}
          position="relative"
          ref={ref}
        >
          <Box
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
            bg="tealGreen.700"
          >
            <Img
              style={{ mixBlendMode: 'luminosity' }}
              opacity="20%"
              boxSize="100%"
              objectFit="cover"
              src={delaware_full1}
              alt="A beautiful view of Hoyt Lake"
            />
          </Box>
          <Box mt="auto" pt="5" w="100%" mb="12" position="relative">
            <Container maxW="container.xl">
              <Grid py="6" templateColumns="repeat(12, 1fr)" gap="6">
                <GridItem
                  colStart={{ lg: '2', xl: '3' }}
                  colSpan={{ base: '12', lg: '10', xl: '8' }}
                >
                  <Box>
                    <Heading
                      fontSize={{ base: '4xl', lg: '5xl' }}
                      mb="2"
                      color="white"
                      lineHeight="1.125"
                    >
                      Sign the Letter of Support for GBNRTC's Proposed Scenario
                      for the Scajaquada Corridor!
                    </Heading>
                  </Box>
                </GridItem>
              </Grid>
            </Container>
          </Box>
        </Flex>
        <Container maxW="container.xl" pt="16" pb="32">
          <Box
            as="iframe"
            mx="auto"
            src="https://docs.google.com/forms/d/e/1FAIpQLSd33ZxMvnw1hKFS99aU5zncv7vTitjYwvqv6_PFyIMwGciFzg/viewform?embedded=true"
            width="100%"
            height={{
              base: '3947px',
              sm: '3211px',
              md: '2528px',
            }}
            title="GoogleForm"
          >
            Loading…
          </Box>
        </Container>
      </main>
    </>
  )
}
