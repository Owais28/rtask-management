import { useEffect, useState } from 'react';
import { Button, Heading, Stack, Text, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Grid, HStack, Input, Textarea, Select, Badge, Spinner, Box, MenuOptionGroup, MenuItem, Menu, MenuButton, MenuList, MenuItemOption, MenuDivider, MenuIcon, Avatar, VStack } from '@chakra-ui/react';
import TaskCard from './components/TaskCard';

const HomePage = () => {
  const [tasks, setTasks] = useState([
    {
      "id": 1,
      "title": "Task 1",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "dueDate": "2023-07-10",
      "status": "IN_PROGRESS",
      "assignedUser": "John Doe"
    },
    {
      "id": 2,
      "title": "Task 2",
      "description": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "dueDate": "2023-07-12",
      "status": "DONE",
      "assignedUser": "Jane Smith"
    },
    {
      "id": 3,
      "title": "Task 3",
      "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      "dueDate": "2023-07-15",
      "status": "TODO",
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
  const [isUpdateModal, setIsUpdateModal] = useState(true)

  const handleUpdateModal = (e) => {
    setIsUpdateModal(true)
    onOpen()
  }

  const handleCreateModal = (e) => {
    setIsUpdateModal(false)
    onOpen()
  }

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
        <HStack wrap={'wrap'} transition={'all .3s linear'} rowGap={5} alignItems={'center'} justifyContent={'space-between'} px={3}>
          <Heading fontFamily={'Space Mono'} fontWeight={'black'} position={'static'} color={'white'} as="h1" fontSize={['2xl', '4xl']} transition={'all .5s linear'}>
            Tasks
          </Heading>
          <HStack gap={[5, 6, 8]}>

            <HStack as={'button'} alignItems={'center'} transition={'all .5s linear'}>
              <Avatar transition={'all .5s linear'} size={['xs', 'sm']} /> <Text transition={'all .5s linear'} color={'white'} fontSize={['sm', 'md']} >Owais Athar</Text>
            </HStack>

            <Button colorScheme='yellow' size={['xs', 'md']} >
              Logout
            </Button>
          </HStack>
        </HStack>
        <Grid transition={'all .5s linear'} px={3} autoRows={'auto'} templateColumns={['repeat(1, fr)', 'repeat(2, 200px)', 'repeat(3, 1fr)']} overflow={'scroll'} gap={3}>
          {tasks.length > 0 ? (
            [...tasks, ...tasks, ...tasks].map((task, index) => (
              <TaskCard onClick={handleUpdateModal} key={index} task={task} />
            ))
          ) : (
            <Text>No tasks found.</Text>
          )}
        </Grid>
        <Button colorScheme='orange' position={'fixed'} onClick={handleCreateModal} bottom={10} right={10} maxWidth={1000} mx={"auto"} >
          <Text fontSize={'xl'} >
            Create +
          </Text>
        </Button>
      </Stack>

      {/* <Modal isOpen={isOpenNewTask} onClose={onCloseNewTask} isCentered >
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
      {/* <Stack>
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
      </Modal> */}

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay backdropFilter="blur(8px)"   // Apply the blur effect to the overlay
          bg="rgba(0, 0, 0, 0.5)" />
        <ModalContent width={['90vw']}>
          {isUpdateModal ? (
            <>
              <ModalHeader fontFamily={'Roboto'} fontSize={['lg', 'xl']}>Task 1</ModalHeader>
              <ModalCloseButton />
              <ModalBody fontFamily={'Roboto'} fontSize={['md', 'lg']} height={'max-content'}>
                <Stack fontSize={'sm'}>
                  <HStack gap={10}>
                    <Text width={'25%'}>
                      Status
                    </Text>
                    <Select placeholder='Select option' fontSize={'sm'} defaultValue={'TO-DO'}>
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
                    <Menu closeOnSelect={false}>
                      <MenuButton as={Button} colorScheme='gray' width={'full'}>
                        Select
                      </MenuButton>
                      <MenuList minWidth='240px'>
                        <MenuOptionGroup title='Users' type='checkbox'>
                          <MenuItemOption value='email'>
                            <HStack alignItems={'center'} justify={'start'}>
                              <Avatar size={'sm'} mr={1} />
                              <Text fontSize={'sm'}>
                                Owais Athar
                              </Text>
                            </HStack>
                          </MenuItemOption>
                          <MenuItemOption value='phone'>
                            <HStack alignItems={'center'} justify={'start'}>
                              <Avatar size={'sm'} mr={1} />
                              <Text fontSize={'sm'}>
                                Owais Athar
                              </Text>
                            </HStack>
                          </MenuItemOption>
                          <MenuItemOption value='country'>
                            <HStack alignItems={'center'} justify={'start'}>
                              <Avatar size={'sm'} mr={1} />
                              <Text fontSize={'sm'}>
                                Owais Athar
                              </Text>
                            </HStack>
                          </MenuItemOption>
                        </MenuOptionGroup>
                      </MenuList>
                    </Menu>
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
            </>
          ) : (<>
            <ModalHeader fontFamily={'Roboto'} fontSize={['lg', 'xl']}>
              <Input placeholder='give title' width={'90%'} colorScheme='orange' />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody fontFamily={'Roboto'} fontSize={['md', 'lg']} height={'max-content'}>
              <Stack fontSize={'sm'}>
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
                  <Menu closeOnSelect={false}>
                    <MenuButton as={Button} colorScheme='gray' width={'full'}>
                      Select
                    </MenuButton>
                    <MenuList minWidth='240px'>
                      <MenuOptionGroup title='Users' type='checkbox'>
                        <MenuItemOption value='email'>
                          <HStack alignItems={'center'} justify={'start'}>
                            <Avatar size={'sm'} mr={1} />
                            <Text fontSize={'sm'}>
                              Owais Athar
                            </Text>
                          </HStack>
                        </MenuItemOption>
                        <MenuItemOption value='phone'>
                          <HStack alignItems={'center'} justify={'start'}>
                            <Avatar size={'sm'} mr={1} />
                            <Text fontSize={'sm'}>
                              Owais Athar
                            </Text>
                          </HStack>
                        </MenuItemOption>
                        <MenuItemOption value='country'>
                          <HStack alignItems={'center'} justify={'start'}>
                            <Avatar size={'sm'} mr={1} />
                            <Text fontSize={'sm'}>
                              Owais Athar
                            </Text>
                          </HStack>
                        </MenuItemOption>
                      </MenuOptionGroup>
                    </MenuList>
                  </Menu>
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
                Add
              </Button>
              <Button variant='outline' colorScheme='gray' onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </>)
          }
        </ModalContent>
      </Modal>
    </Stack >
  );
};

export default HomePage;
