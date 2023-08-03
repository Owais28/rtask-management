import { useState } from "react";
import { createContext } from "react";
import PropTypes from 'prop-types';
import { useEffect } from "react";
import axios from 'axios'

export const TaskContext = createContext([])

async function fetchAllTask(token) {
  const apiUrl = 'https://task-management-server-hvyx.onrender.com/tasks'
  return await axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
    .then(res => res.data)
    .catch(err => console.log(err))
}

export default function TaskContextProvider({ children }) {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetchAllTask('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGE1NTgzYWJjZTQ3N2RlNTgzYzlmNmIiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5MTA3MTg2MiwiZXhwIjoxNjkxMTU4MjYyfQ.1UVLn09Atq89hZ2zJD1bbvzYXjkolrOM-Y7K1xcidUc')
      .then(
        res => console.log(res)
      ).catch(rej => console.log('something went wrong while fetching tasks.'))
  }, [])

  return <TaskContext.Provider value={[tasks, setTasks]}>
    {children}
  </TaskContext.Provider>
}

TaskContextProvider.propTypes = {
  children: PropTypes.node
}