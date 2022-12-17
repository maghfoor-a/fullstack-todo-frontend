import axios from "axios";
import { useEffect, useState } from "react";
import { TaskType } from "../interface-TaskType";

type ResultType = {
  tasks: TaskType[];
  completedTasks: TaskType[];
};

export const useFetchAllTasks = (btnPressed: boolean): ResultType => {
  const [tasks, setTasks] = useState<TaskType[] | []>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskType[] | []>([]);
  useEffect(() => {
    const fetchAllTasks = async () => {
      const axiosResponse = await axios.get(
        "https://fullstack-todo.onrender.com/tasks"
      );
      setTasks(axiosResponse.data);
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
  return { tasks, completedTasks };
};
