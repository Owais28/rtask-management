import { Badge, Box, Divider, GridItem, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { GoPerson } from 'react-icons/go'
export default function TaskCard(props) {

  // const handleDeleteTask = (e) => {
  //   console.log("Deleted")
  // }

  // const handleUpdateTask = (e) => {
  //   console.log("Updated")
  // }

  let StatusBadge
  if (props.task.status === "TODO") StatusBadge = <Badge fontFamily={'mono'} colorScheme={'purple'}>
    {props.task.status}
  </Badge>
  else if (props.task.status === "IN_PROGRESS") StatusBadge = <Badge fontFamily={'mono'} colorScheme={'orange'}>
    {props.task.status}
  </Badge>
  else StatusBadge = <Badge fontFamily={'mono'} colorScheme={'green'}>
    {props.task.status}
  </Badge>

  return (
    <GridItem transition={'all .5s linear'} onClick={props.onClick} flex={1}>
      <VStack alignItems={'start'} transition={'all .5s linear'} key={props.task.id} borderWidth={2} flex={1} height={'100%'} _hover={{ cursor: "pointer", borderColor: 'orange', borderWidth: 2 }} bgColor={'white'} flexBasis={1} borderRadius="md" p={4} mb={4}>
        <Text fontFamily={'Roboto'} fontWeight={'semibold'} as="h4" fontSize={["md", "lg"]} >
          {props.task.title}
        </Text>
        <Divider />
        <Text mb={2} color={'gray.500'} fontFamily={'Roboto'}>{props.task.description.slice(0, 50)}...</Text>
        <HStack flexShrink={1} flexWrap={'wrap'} alignItems={'start'} justify={'start'}>
          {StatusBadge}
          <Badge alignItems={'center'} colorScheme='cyan' fontFamily={'mono'} >
            <HStack alignItems={'center'}>
              <AiOutlineClockCircle style={{ display: 'inline-block' }} />
              <Text>
                {props.task.dueDate}
              </Text>
            </HStack>
          </Badge>


          <Badge fontFamily={'mono'}>
            <HStack alignItems={'center'}>
              <GoPerson style={{ display: 'inline-block' }} />
              <Text>
                {props.task.assignedUser}
              </Text>
            </HStack>
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