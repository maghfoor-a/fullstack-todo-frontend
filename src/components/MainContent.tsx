import { useEffect, useState } from "react";
import axios from "axios";

interface TaskType {
  id: number;
  task: string;
}

export default function MainContent(): JSX.Element {
  const [tasks, setTasks] = useState<TaskType[] | []>([]);
  const [btnPressed, setBtnPressed] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");
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
      <button
        onClick={async () => {
          await axios.post("https://fullstack-todo.onrender.com/tasks", {
            id: tasks.length + 1,
            task: inputVal,
          });
          setBtnPressed((prev) => !prev);
          setInputVal("");
        }}
      >
        add task
      </button>
      <button
        onClick={async () => {
          await axios.patch("https://fullstack-todo.onrender.com/tasks/reset");
          setBtnPressed((prev) => !prev);
        }}
      >
        Clear All
      </button>
      <p>Add a task name below!</p>
      <input
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      ></input>
      {tasks.map((task, i) => (
        <p key={i}>
          Task Number {task.id}: {task.task}
        </p>
      ))}
    </>
  );
}
