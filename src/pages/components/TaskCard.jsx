import { Badge, Box, GridItem, HStack, Heading, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export default function TaskCard(props) {

  // const handleDeleteTask = (e) => {
  //   console.log("Deleted")
  // }

  // const handleUpdateTask = (e) => {
  //   console.log("Updated")
  // }

  return (
    <GridItem onClick={props.onClick} flex={1}>
      <Box key={props.task.id} borderWidth="1px" flex={1} height={'100%'} _hover={{ cursor: "pointer" }} bgColor={'white'} flexBasis={1} borderRadius="md" p={4} mb={4}>
        <Text fontFamily={'Roboto'} fontWeight={'semibold'} as="h4" fontSize={["md", "lg"]} mb={2}>
          {props.task.title}
        </Text>
        <Text mb={2}>{props.task.description}</Text>
        <HStack flexShrink={1} flexWrap={'wrap'}>
          <Badge colorScheme='blue' >
            <span>Due Date:</span> {props.task.dueDate}
          </Badge>
          <Badge>
            <span>Status:</span> {props.task.status}
          </Badge>
          <Badge>
            <span>Assigned User:</span> {props.task.assignedUser}
          </Badge>
        </HStack>
        {/* <Button colorScheme="red" mt={2} onClick={() => handleDeleteTask(props.task.id)}>
        Delete
        </Button>
        <Button colorScheme="blue" mt={2} onClick={() => handleUpdateTask(props.task.id)}>
        Update
      </Button> */}
      </Box>
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