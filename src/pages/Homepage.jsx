import { useEffect, useState } from 'react';
import { Button, Heading, Stack, Text, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Grid, HStack, Input, Textarea, Select, Badge, Spinner, Box } from '@chakra-ui/react';
import TaskCard from './components/TaskCard';

const HomePage = () => {
  const [tasks, setTasks] = useState([
    {
      "id": 1,
      "title": "Task 1",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "dueDate": "2023-07-10",
      "status": "In Progress",
      "assignedUser": "John Doe"
    },
    {
      "id": 2,
      "title": "Task 2",
      "description": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "dueDate": "2023-07-12",
      "status": "Completed",
      "assignedUser": "Jane Smith"
    },
    {
      "id": 3,
      "title": "Task 3",
      "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      "dueDate": "2023-07-15",
      "status": "Pending",
      "assignedUser": "Michael Johnson"
    }
  ]
  );

  useEffect(() => {
    // Fetch tasks data from the backend API
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpenNewTask, onOpenNewTask, onCloseNewTask } = useDisclosure()

  return (
    <Stack minH={"100vh"}
      // backgroundImage='url("https://www.lincoln.ac.uk/course/illillub/")'
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      // align={"center"}
      // justify={"center"}

      bg={useColorModeValue("gray.800", "gray.800")}
    >
      <Stack position={'relative'} spacing={8} maxW={1000} mx={"auto"} flexBasis={1} py={12} px={1}>
        <Heading position={'static'} color={useColorModeValue('white')} px={3} as="h1" mb={4} fontSize={['2xl', '4xl']} transition={'all .5s linear'}>
          Task List
        </Heading>
        <Grid transition={'all .5s linear'} px={3} autoRows={'auto'} templateColumns={['repeat(1, fr)', 'repeat(2, 200px)', 'repeat(3, 1fr)']} overflow={'scroll'} gap={3}>
          {tasks.length > 0 ? (
            [...tasks, ...tasks, ...tasks].map((task, index) => (
              <TaskCard onClick={onOpen} key={index} task={task} />
            ))
          ) : (
            <Text>No tasks found.</Text>
          )}
        </Grid>
        <Button colorScheme='orange' position={'fixed'} onClick={onOpenNewTask} bottom={10} right={10} as='button' maxWidth={1000} mx={"auto"} >
          <Text fontSize={'xl'} >
            Create +
          </Text>
        </Button>
      </Stack>

      <Modal isOpen={isOpenNewTask} onClose={onCloseNewTask} isCentered >
        <ModalOverlay backdropFilter="blur(8px)"   // Apply the blur effect to the overlay
          bg="rgba(0, 0, 0, 0.5)" />
        <ModalContent width={['90vw']}>
          <ModalHeader fontFamily={'Roboto'} fontSize={['lg', 'xl']}>Task 1</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily={'Roboto'} fontSize={['md', 'lg']} height={'max-content'}>
            <Stack>
              <HStack gap={10}>
                <Text width={'25%'}>
                  Status
                </Text>
                <Select placeholder='Select option' defaultValue={'TO-DO'}>
                  <option value='TO-DO'>
                    TO-DO

                  </option>
                  <option value='IN-PROGRESS'>IN-PROGRESS</option>
                  <option value='DONE'>DONE</option>
                </Select>
              </HStack>
              <HStack gap={10}>
                <Text width={'25%'}>
                  Due date
                </Text>
                <Input type='date' placeholder='due date' />
              </HStack>
              <HStack gap={10}>
                <Text width={'25%'}>
                  Assignee
                </Text>
                <Select placeholder='Select option' fill>
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select>
              </HStack>
              {/* <Lorem count={2} /> */}
              <Stack>
                <Text>
                  Description
                </Text>
                <Textarea bgColor={'gray.100'} />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit repellendus cum voluptas ipsam vitae illo cumque nihil, accusamus maiores, dolorum eum nostrum ut id deserunt tempore, nemo esse rem nam.
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Update
            </Button>
            <Button variant='outline' colorScheme='red'>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay backdropFilter="blur(8px)"   // Apply the blur effect to the overlay
          bg="rgba(0, 0, 0, 0.5)" />
        <ModalContent width={['90vw']}>
          <ModalHeader fontFamily={'Roboto'} fontSize={['lg', 'xl']}>Task 1</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily={'Roboto'} fontSize={['md', 'lg']} height={'max-content'}>
            <Stack>
              <HStack gap={10}>
                <Text width={'25%'}>
                  Status
                </Text>
                <Select placeholder='Select option' defaultValue={'TO-DO'}>
                  <option value='TO-DO'>
                    TO-DO

                  </option>
                  <option value='IN-PROGRESS'>IN-PROGRESS</option>
                  <option value='DONE'>DONE</option>
                </Select>
              </HStack>
              <HStack gap={10}>
                <Text width={'25%'}>
                  Due date
                </Text>
                <Input type='date' placeholder='due date' />
              </HStack>
              <HStack gap={10}>
                <Text width={'25%'}>
                  Assignee
                </Text>
                <Select placeholder='Select option' fill>
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select>
              </HStack>
              {/* <Lorem count={2} /> */}
              <Stack>
                <Text>
                  Description
                </Text>
                <Textarea bgColor={'gray.100'} />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit repellendus cum voluptas ipsam vitae illo cumque nihil, accusamus maiores, dolorum eum nostrum ut id deserunt tempore, nemo esse rem nam.
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Update
            </Button>
            <Button variant='outline' colorScheme='red'>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack >
  );
};

export default HomePage;
