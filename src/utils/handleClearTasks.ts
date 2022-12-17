import axios from "axios";

export const handleClearTasks = async (): Promise<void> => {
  await axios.delete("https://fullstack-todo.onrender.com/tasks/reset");
};
