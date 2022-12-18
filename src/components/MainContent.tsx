import { useState } from "react";
import "./MainContentStyles.css";
import { TaskType } from "../utils/interface-TaskType";
import { auth } from "../config/firebaseConfig";
import { signOut, User } from "firebase/auth";

//importing helper functions
import { handleCompleteTask } from "../utils/handleCompleteTask";
import { handleDeleteTask } from "../utils/handleDeleteTask";
import { handleAddTask } from "../utils/handleAddTask";
import { handleClearCompleted } from "../utils/handleClearCompleted";
import { handleClearTasks } from "../utils/handleClearTasks";
import { useFetchAllTasks } from "../utils/customHooks/fetchAllTasks";
import AppHeader from "./AppHeader";

interface MainContentProps {
  LoggedInUser: User | null;
}

export default function MainContent(props: MainContentProps): JSX.Element {
  const [btnPressed, setBtnPressed] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");

  const tasks = useFetchAllTasks(btnPressed).tasks;
  const completedTasks = useFetchAllTasks(btnPressed).completedTasks;

  const completeTask = async (task: TaskType) => {
    await handleCompleteTask(task);
    setBtnPressed((prev) => !prev);
  };

  const deleteTask = async (task: TaskType) => {
    await handleDeleteTask(task);
    setBtnPressed((prev) => !prev);
  };

  const addTask = async () => {
    await handleAddTask(inputVal);
    setBtnPressed((prev) => !prev);
    setInputVal("");
  };

  const clearCompleted = async () => {
    await handleClearCompleted();
    setBtnPressed((prev) => !prev);
  };

  const clearTasks = async () => {
    await handleClearTasks();
    setBtnPressed((prev) => !prev);
  };

  return (
    <>
      {props.LoggedInUser && (
        <h4>Hi {props.LoggedInUser.displayName}! Here are your tasks!</h4>
      )}
      {props.LoggedInUser && props.LoggedInUser.photoURL && (
        <img src={props.LoggedInUser.photoURL} alt="User" />
      )}
      <button onClick={() => signOut(auth)}>SIGN OUT</button>
      <h1>ALL TASKS</h1>
      <p>Add a task name below!</p>
      <input
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      ></input>
      <button onClick={addTask}>add task</button>
      <button onClick={clearTasks}>Clear All</button>
      <hr />
      {tasks.map((task, i) => (
        <div key={i}>
          <li className="TaskText">{task.task}</li>
          {task.status && <p>✅</p>}
          <button onClick={() => completeTask(task)}>✅</button>
          <button onClick={() => deleteTask(task)}>❌</button>
        </div>
      ))}
      <hr />
      <h1>COMPLETED</h1>
      <button onClick={clearCompleted}>Clear</button>
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
