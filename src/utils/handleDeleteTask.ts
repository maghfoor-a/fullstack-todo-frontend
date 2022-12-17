import axios from "axios";
import { TaskType } from "./interface-TaskType";

export const handleDeleteTask = async (task: TaskType): Promise<void> => {
  await axios.delete(
    `https://fullstack-todo.onrender.com/task/${task.task_id}`
  );
};
