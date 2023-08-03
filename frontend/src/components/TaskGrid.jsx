import { Center, Grid, Text } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import PropTypes from 'prop-types';
import { useContext } from "react";
import { TaskContext } from "../context/taskContext";


export default function TaskGrid({ handleUpdate }) {

  const [tasks, setTasks] = useContext(TaskContext)
  // console.log(tasks)

  if (!tasks.length) {
    return <Center>
      <Text textAlign={'center'} color={'red.300'}>No tasks found.</Text>
    </Center>
  }

  return (
    <Grid className='tasks-grid' transition={'all .5s linear'} px={3} autoRows={'auto'} templateColumns={['repeat(1, fr)', 'repeat(2, 200px)', 'repeat(3, 1fr)']} overflow={'scroll'} gap={3}>
      {tasks.map((task, index) => <TaskCard onClick={handleUpdate} key={index} task={task} />)}
    </Grid>
  )
}

TaskGrid.propTypes = {
  tasks: PropTypes.array,
  handleUpdate: PropTypes.func
}