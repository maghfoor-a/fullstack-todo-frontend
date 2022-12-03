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

  const handleCompleteTask = async (task: TaskType) => {
    await axios.post(`https://fullstack-todo.onrender.com/completed`, {
      ...task,
    });
    await axios.delete(`https://fullstack-todo.onrender.com/task/${task.id}`);
    setBtnPressed((prev) => !prev);
  };

  const handleDeleteTask = async (task: TaskType) => {
    await axios.delete(`https://fullstack-todo.onrender.com/task/${task.id}`);
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

  const handleClearCompleted = async () => {
    await axios.delete("https://fullstack-todo.onrender.com/completed/reset");
    setBtnPressed((prev) => !prev);
  };
  console.log(completedTasks);

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
          <li className="TaskText">{task.task}</li>
          {task.status && <p>✅</p>}
          <button onClick={() => handleCompleteTask(task)}>✅</button>
          <button onClick={() => handleDeleteTask(task)}>❌</button>
        </div>
      ))}
      <hr />
      <h1>COMPLETED</h1>
      <button onClick={handleClearCompleted}>Clear</button>
      {completedTasks.map((completed, i) => (
        <div key={completed.task + i}>
          <li>
            <s>{completed.task}</s>
          </li>
        </div>
      ))}
    </>
  );
}
