import axios from "axios";
import { TaskType } from "./interface-TaskType";

export const handleCompleteTask = async (task: TaskType): Promise<void> => {
  await axios.put(`https://fullstack-todo.onrender.com/completed`, {
    id: task.task_id,
  });
};
