import { useEffect, useState } from "react";
import axios from "axios";

interface TaskType {
    id: number,
}

export default function MainContent(): JSX.Element {
    const [tasks, setTasks] = useState<TaskType[]|[]>([])
    useEffect(() => {
        const fetchAllTasks = async () => {
            
            const axiosResponse = await axios.get("https://fullstack-todo.onrender.com/tasks",)
            setTasks(axiosResponse.data)
            console.log("The status code of response is", axiosResponse.status)  
        }
        fetchAllTasks();
    }, [])
    console.log(tasks)
  return (
    <>
      <h1>ALL TASKS</h1>
      {tasks.map((task, i) => <p key={i}>{task}</p>)}
    </>
  );
}
