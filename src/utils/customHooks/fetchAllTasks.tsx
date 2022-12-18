import axios from "axios";
import { useEffect, useState } from "react";
import { TaskType } from "../interface-TaskType";

//url = https://fullstack-todo.onrender.com/tasks

type ResultType = {
  tasks: TaskType[];
};

interface FetchAllTasksProps {
  btnPressed: boolean;
  userUID: string | null;
}

export const useFetchAllTasks = (props: FetchAllTasksProps): ResultType => {
  const [tasks, setTasks] = useState<TaskType[] | []>([]);
  useEffect(() => {
    const fetchAllTasks = async () => {
      const axiosResponse = await axios.post(
        "https://fullstack-todo.onrender.com/alltasks",
        {
          data: {
            user_id: props.userUID,
          },
        }
      );
      setTasks(axiosResponse.data);
    };
    fetchAllTasks();
  }, [props.btnPressed, props.userUID]);
  return { tasks };
};
