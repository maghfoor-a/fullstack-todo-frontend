import axios from "axios";
export const handleAddTask = async (
  inputVal: string,
  userUID: string | null
): Promise<void> => {
  await axios.post("https://fullstack-todo.onrender.com/tasks", {
    task: inputVal,
    user_id: userUID,
  });
};
