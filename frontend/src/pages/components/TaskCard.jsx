import { Badge, Box, Divider, GridItem, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export default function TaskCard(props) {

  // const handleDeleteTask = (e) => {
  //   console.log("Deleted")
  // }

  // const handleUpdateTask = (e) => {
  //   console.log("Updated")
  // }

  return (
    <GridItem transition={'all .5s linear'} onClick={props.onClick} flex={1}>
      <VStack alignItems={'start'} transition={'all .5s linear'} key={props.task.id} borderWidth={2} flex={1} height={'100%'} _hover={{ cursor: "pointer", borderColor: 'orange', borderWidth: 2 }} bgColor={'white'} flexBasis={1} borderRadius="md" p={4} mb={4}>
        <Text fontFamily={'Roboto'} fontWeight={'semibold'} as="h4" fontSize={["md", "lg"]} >
          {props.task.title}
        </Text>
        <Divider />
        <Text mb={2} color={'gray.500'} fontFamily={'Roboto'}>{props.task.description.slice(0, 50)}...</Text>
        <HStack flexShrink={1} flexWrap={'wrap'} alignItems={'start'} justify={'start'}>
          <Badge colorScheme='cyan' fontFamily={'mono'} >
            <span>Due Date:</span> {props.task.dueDate}
          </Badge>

          <Badge fontFamily={'mono'}>
            {props.task.status}
          </Badge>

          <Badge fontFamily={'mono'}>
            {props.task.assignedUser}
          </Badge>
        </HStack>
        {/* <Button colorScheme="red" mt={2} onClick={() => handleDeleteTask(props.task.id)}>
        Delete
        </Button>
        <Button colorScheme="blue" mt={2} onClick={() => handleUpdateTask(props.task.id)}>
        Update
      </Button> */}
      </VStack>
    </GridItem>
  )
}


TaskCard.propTypes = {
  task: {
    id: PropTypes.number,
    description: PropTypes.string,
    dueDate: PropTypes.string,
    status: PropTypes.string,
    assignedUser: PropTypes.string,
  },
  onClick: PropTypes.func
}