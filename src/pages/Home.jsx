import { Box, Heading, Text, Button, Flex, useColorModeValue, Stack, } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import HomePage from "./Homepage";

const Home = () => {
  const [isLoggedIn, setLoggedIn] = useState(true)

  if (!isLoggedIn)
    return (
      <Flex minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
        px={12}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={5}>
            <Heading as="h1" ontSize="4xl">
              Welcome to the Task Management App
            </Heading>
            <Text fontSize={'xl'} >
              This is the home page of the task management app. You can add, update,
              and delete tasks to effectively manage your daily tasks.
            </Text>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              <Link to={"/login"}>Get Started</Link>
            </Button>
          </Stack>
        </Box>

      </Flex>
    );

  return <HomePage />
};

export default Home;
