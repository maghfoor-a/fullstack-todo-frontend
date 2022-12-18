import axios from "axios";

export const handleClearCompleted = async (
  userUID: string | null
): Promise<void> => {
  await axios.delete("https://fullstack-todo.onrender.com/completed/reset", {
    data: {
      user_id: userUID,
    },
  });
};
