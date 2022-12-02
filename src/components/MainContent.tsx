import { useEffect, useState } from "react";
import axios from "axios";
import "./MainContentStyles.css";

interface TaskType {
  id: number;
  status: boolean;
  task: string;
}

export default function MainContent(): JSX.Element {
  const [tasks, setTasks] = useState<TaskType[] | []>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskType[] | []>([]);
  const [btnPressed, setBtnPressed] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");

  const handleDeleteTask = async (id: number) => {
    await axios.delete(`https://fullstack-todo.onrender.com/task/${id}`);
    setBtnPressed((prev) => !prev);
  };

  useEffect(() => {
    const fetchAllTasks = async () => {
      const axiosResponse = await axios.get(
        "https://fullstack-todo.onrender.com/tasks"
      );
      setTasks(axiosResponse.data);
      console.log("The status code of response is", axiosResponse.status);
    };
    fetchAllTasks();
    const fetchCompeltedTasks = async () => {
      const axiosCompletedTaskRes = await axios.get(
        "https://fullstack-todo.onrender.com/completed"
      );
      setCompletedTasks(axiosCompletedTaskRes.data);
    };
    fetchCompeltedTasks();
  }, [btnPressed]);

  const handleAddTaskButton = async () => {
    await axios.post("https://fullstack-todo.onrender.com/tasks", {
      task: inputVal,
    });
    setBtnPressed((prev) => !prev);
    setInputVal("");
  };
  console.log(completedTasks);

  const handleTaskClicked = async (task: TaskType) => {
    await axios.patch(`https://fullstack-todo.onrender.com/tasks/${task.id}`, {
      status: true,
      task: task.task,
    });
    await axios.post("https://fullstack-todo.onrender.com/tasks/completed", {
      ...task,
    });
    setBtnPressed((prev) => !prev);
  };
  return (
    <>
      <h1>ALL TASKS</h1>
      <p>Add a task name below!</p>
      <input
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      ></input>
      <button onClick={handleAddTaskButton}>add task</button>
      <button
        onClick={async () => {
          await axios.delete("https://fullstack-todo.onrender.com/tasks/reset");
          setBtnPressed((prev) => !prev);
        }}
      >
        Clear All
      </button>
      <hr />
      {tasks.map((task, i) => (
        <div key={i}>
          <li onClick={() => handleTaskClicked(task)} className="TaskText">
            {task.task}
          </li>
          {task.status && <p>✅</p>}
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </div>
      ))}
      <hr />
      {completedTasks.map((completed, i) => (
        <div key={completed.task + i}>
          <li>{completed.task}</li>
        </div>
      ))}
    </>
  );
}
