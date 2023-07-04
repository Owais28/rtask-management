import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box p={4}>
      <Heading as="h1" mb={4} fontSize="xl">
        Welcome to the Task Management App
      </Heading>
      <Text mb={4}>
        This is the home page of the task management app. You can add, update,
        and delete tasks to effectively manage your daily tasks.
      </Text>
      <Button colorScheme="blue">
        <Link to={"/login"}>Get Started</Link>
      </Button>
    </Box>
  );
};

export default Home;
