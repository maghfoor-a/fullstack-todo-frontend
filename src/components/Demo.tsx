import { useState } from "react";
import "../components/Styling/MainContent.css";

interface DemoTask {
  id: number;
  task: string;
  status: boolean;
}
export default function Demo(): JSX.Element {
  const [inputVal, setInputVal] = useState<string>("");
  const [tasks, setTasks] = useState<DemoTask[]>([]);
  const [counter, setCounter] = useState<number>(0);
  function DemoAdd() {
    setCounter((prev) => prev + 1);
    setTasks([...tasks, { task: inputVal, status: false, id: counter }]);
    setInputVal("");
  }
  function demoClear() {
    setTasks([]);
  }
  function handleComplete(task: DemoTask, idNumber: number) {
    setCounter((prev) => prev + 1);
    // setTasks([...tasks, { task: task.task, status: true, id: counter}])
    // setTasks(tasks.filter(task => task.id !== idNumber))
    const newState: DemoTask[] = tasks.map((task) => {
      if (task.id === idNumber) {
        return { ...task, status: true };
      }
      return task;
    });
    setTasks(newState);
  }
  console.log(tasks);
  return (
    <>
      <h1>DEMO</h1>
      <h2>ALL TASKS</h2>
      <p>Add a task name below!</p>
      <input
        className="InputField"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      ></input>
      <button className="Button Tick" onClick={DemoAdd}>
        Add Task
      </button>
      <button className="Button Cross" onClick={demoClear}>
        Clear Tasks
      </button>
      {tasks
        .filter((task) => task.status === false)
        .map((task, i) => (
          <div className="EachTask" key={i}>
            <p className="TaskText">{task.task}</p>
            <button
              className="Button Tick"
              onClick={() => handleComplete(task, task.id)}
            >
              ✅
            </button>
            <button
              className="Button Cross"
              onClick={() =>
                setTasks(tasks.filter((task) => tasks.indexOf(task) !== i))
              }
            >
              ❌
            </button>
          </div>
        ))}
      <hr></hr>
      <h2>COMPLETED TASKS</h2>
      {tasks
        .filter((task) => task.status === true)
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
