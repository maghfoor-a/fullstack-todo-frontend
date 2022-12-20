import { useState } from "react";
import "./MainContentStyles.css";
import { TaskType } from "../utils/interface-TaskType";
import { auth } from "../config/firebaseConfig";
import { signOut, User } from "firebase/auth";
import "../components/Styling/MainContent.css";

//importing helper functions
import { handleCompleteTask } from "../utils/handleCompleteTask";
import { handleDeleteTask } from "../utils/handleDeleteTask";
import { handleAddTask } from "../utils/handleAddTask";
import { handleClearCompleted } from "../utils/handleClearCompleted";
import { handleClearTasks } from "../utils/handleClearTasks";
import { useFetchAllTasks } from "../utils/customHooks/fetchAllTasks";

//importing icons
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

interface MainContentProps {
  LoggedInUser: User | null;
}

export default function MainContent(props: MainContentProps): JSX.Element {
  const [btnPressed, setBtnPressed] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");

  const userUID = props.LoggedInUser && props.LoggedInUser.uid;
  const tasks = useFetchAllTasks({ btnPressed, userUID }).tasks;

  const completeTask = async (task: TaskType) => {
    await handleCompleteTask(task);
    setBtnPressed((prev) => !prev);
  };

  const deleteTask = async (task: TaskType) => {
    await handleDeleteTask(task);
    setBtnPressed((prev) => !prev);
  };

  const addTask = async () => {
    await handleAddTask(inputVal, userUID);
    setBtnPressed((prev) => !prev);
    setInputVal("");
  };

  const clearCompleted = async () => {
    await handleClearCompleted(userUID);
    setBtnPressed((prev) => !prev);
  };

  const clearTasks = async () => {
    await handleClearTasks(userUID);
    setBtnPressed((prev) => !prev);
  };

  return (
    <>
      {props.LoggedInUser && (
        <h4>Hi {props.LoggedInUser.displayName}! Let's get stuff done!</h4>
      )}
      {props.LoggedInUser && props.LoggedInUser.photoURL && (
        <img
          slot="start"
          referrerPolicy="no-referrer"
          src={props.LoggedInUser.photoURL}
          alt="User"
        />
      )}
      <div>
        <button className="Button Signout" onClick={() => signOut(auth)}>
          SIGN OUT
        </button>
      </div>
      <div className="AllTasksTitle">
        <h1>ALL TASKS</h1>
      </div>
      <p>Add a task name below!</p>
      <input
        className="InputField"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      ></input>
      <button className="Button AddTask" onClick={addTask}>
        Add Task
      </button>
      <button className="Button ClearTasks" onClick={clearTasks}>
        Clear All
      </button>
      <hr />
      {tasks
        .filter((task) => task.complete === false)
        .map((task, i) => (
          <div className="EachTask" key={i}>
            <p className="TaskText">{task.task}</p>
            <button className="Button Tick" onClick={() => completeTask(task)}>
              <TiTick size="2rem" color="green" />
            </button>
            <button className="Button Cross" onClick={() => deleteTask(task)}>
              <ImCross size="1rem" color="red" />
            </button>
          </div>
        ))}
      <div className="CompletedTasksTitle">
        <h1>COMPLETED</h1>
      </div>
      <button className="Button" onClick={clearCompleted}>
        Clear
      </button>
      {tasks
        .filter((task) => task.complete === true)
        .map((task, i) => (
          <div key={i}>
            <li>
              <s>{task.task}</s>
            </li>
          </div>
        ))}
    </>
  );
}
