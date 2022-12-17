import axios from "axios";
export const handleAddTask = async (inputVal: string): Promise<void> => {
  await axios.post("https://fullstack-todo.onrender.com/tasks", {
    message: inputVal,
  });
};
