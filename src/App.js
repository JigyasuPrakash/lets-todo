import axios from "axios";
import { useEffect, useState } from "react";
import TaskComponent from './components/TaskComponent';
import { TableCell, TableHead, TableRow, TableContainer, Paper, Table, TableBody, Input, Button } from "@mui/material";


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const createNewTaskHandler = () => {
    let data = {item: newTask}
    axios.post("http://localhost:3030/tasks", data).then((response) => {
      if (response.status === 200){
        fetchData()
        setNewTask("");
      }
    })
  }

  const handleNewTaskChange = (e) => {
    let newTaskDetail = e.target.value;
    setNewTask(newTaskDetail);
  }

  const revertCompletion = (id) => {
    axios.get(`http://localhost:3030/tasks/revertCompletion/${id}`).then(() => {
      fetchData()
    })
}

  useEffect(() => {
    fetchData();
  }, [tasks]);

  const fetchData = () => {
    axios.get("http://localhost:3030/tasks").then((response) => {
      if (response.status === 200) {
        setTasks(response.data);
      } else {
        console.log("Something went wrong!")
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        Lets Todo
      </header>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(task => (<TaskComponent task={task} revertCompletion={revertCompletion}></TaskComponent>))}
            <TableRow>
              <TableCell>
                <Input value={newTask} onChange={handleNewTaskChange}/>
              </TableCell>
              <Button onClick={createNewTaskHandler}>+</Button>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
