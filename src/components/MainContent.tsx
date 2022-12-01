import { useEffect, useState } from "react";
import axios from "axios";
import { sortedTasks } from "../utils/sortedTasks";

interface TaskType {
  id: number;
  task: string;
}

export default function MainContent(): JSX.Element {
  const [tasks, setTasks] = useState<TaskType[] | []>([]);
  const [btnPressed, setBtnPressed] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");

  const createTaskID = (TasksInOrder: TaskType[]): number | undefined => {
    for (let index = 0; index < tasks.length - 1; index++) {
      if (tasks[0].id !== 1) {
        return 1;
      }
      if (tasks[index + 1].id === tasks[index].id + 1) {
        continue;
      } else {
        return tasks[index].id + 1;
      }
    }
  };
  const TasksInOrder: TaskType[] = sortedTasks(tasks);

  const handleAddTaskButton = async () => {
    await axios.post("https://fullstack-todo.onrender.com/tasks", {
      id:
        createTaskID(tasks) === undefined
          ? tasks.length + 1
          : createTaskID(tasks),
      task: inputVal,
    });
    setBtnPressed((prev) => !prev);
    setInputVal("");
  };

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
  }, [btnPressed]);
  console.log(tasks);
  return (
    <>
      <h1>ALL TASKS</h1>
      <button onClick={handleAddTaskButton}>add task</button>
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
      {TasksInOrder.map((task, i) => (
        <div key={i}>
          <p>
            Task Number {task.id}: {task.task}
          </p>
          <button onClick={() => handleDeleteTask(task.id)}>
            Delete task {task.id}
          </button>
        </div>
      ))}
    </>
  );
}
