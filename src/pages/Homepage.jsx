import { useEffect, useState } from 'react';
import { Button, Flex, Heading, Stack, Text, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Grid } from '@chakra-ui/react';
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

  return (
    <Stack minH={"100vh"}
      // align={"center"}
      // justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} flexBasis={1} py={12} px={1}>
        <Heading px={3} as="h1" mb={4} fontSize={['2xl', '4xl']}>
          Task List
        </Heading>
        <Grid px={3} autoRows={'auto'} templateColumns={['repeat(1, fr)', 'repeat(2, 200px)', 'repeat(3, 1fr)']} overflow={'scroll'} gap={3}>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TaskCard onClick={onOpen} key={index} task={task} />
            ))
          ) : (
            <Text>No tasks found.</Text>
          )}
        </Grid>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={2} /> */}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit repellendus cum voluptas ipsam vitae illo cumque nihil, accusamus maiores, dolorum eum nostrum ut id deserunt tempore, nemo esse rem nam.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default HomePage;
