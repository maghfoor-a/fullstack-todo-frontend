import axios from "axios";

export const handleClearCompleted = async (): Promise<void> => {
  await axios.delete("https://fullstack-todo.onrender.com/completed/reset");
};
