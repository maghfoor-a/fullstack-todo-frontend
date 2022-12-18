import axios from "axios";

export const handleClearTasks = async (
  userUID: string | null
): Promise<void> => {
  await axios.delete("https://fullstack-todo.onrender.com/tasks/reset", {
    data: {
      user_id: userUID,
    },
  });
};
