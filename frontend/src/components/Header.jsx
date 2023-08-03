import { Avatar, Button, HStack, Heading, Text } from "@chakra-ui/react";

export default function Header() {
  return <HStack wrap={'wrap'} transition={'all .3s linear'} rowGap={5} alignItems={'center'} justifyContent={'space-between'} px={3}>
    <Heading fontFamily={'Space Mono'} fontWeight={'black'} position={'static'} color={'white'} as="h1" fontSize={['2xl', '4xl']} transition={'all .5s linear'}>
      Tasks
    </Heading>
    <HStack gap={[5, 6, 8]}>

      <HStack as={'button'} alignItems={'center'} transition={'all .5s linear'}>
        <Avatar transition={'all .5s linear'} size={['xs', 'sm']} />
        <Text transition={'all .5s linear'} color={'white'} fontSize={['sm', 'md']} >Owais Athar</Text>
      </HStack>

      <Button colorScheme='yellow' size={['xs', 'md']} >
        Logout
      </Button>
    </HStack>
  </HStack>
}