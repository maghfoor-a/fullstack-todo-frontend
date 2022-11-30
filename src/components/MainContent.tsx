import { useEffect, useState } from "react";
import axios from "axios";

interface TaskType {
  id: number;
}

export default function MainContent(): JSX.Element {
  const [tasks, setTasks] = useState<TaskType[] | []>([]);
  const [btnPressed, setBtnPressed] = useState<boolean>(false);
  useEffect(() => {
    const fetchAllTasks = async () => {
      const axiosResponse = await axios.get(
        "https://fullstack-todo.onrender.com/tasks"
      );
      setTasks(axiosResponse.data);
      console.log("The status code of response is", axiosResponse.status);
    };
    fetchAllTasks();
  }, [btnPressed]);
  console.log(tasks);
  return (
    <>
      <h1>ALL TASKS</h1>
      {tasks.map((task, i) => (
        <p key={i}>{task.id}</p>
      ))}
      <button
        onClick={async () => {
          await axios.post("https://fullstack-todo.onrender.com/tasks", {
            id: 1,
          });
          setBtnPressed((prev) => !prev);
        }}
      >
        add 1
      </button>
      <button
        onClick={async () => {
          await axios.patch("https://fullstack-todo.onrender.com/tasks/reset");
          setBtnPressed((prev) => !prev);
        }}
      >
        Clear All
      </button>
    </>
  );
}
