interface TaskType {
  id: number;
  task: string;
}
export const createTaskID = (TasksInOrder: TaskType[]): number | undefined => {
  for (let index = 0; index < TasksInOrder.length - 1; index++) {
    if (TasksInOrder[0].id !== 1) {
      return 1;
    }
    if (TasksInOrder[index + 1].id === TasksInOrder[index].id + 1) {
      continue;
    } else {
      return TasksInOrder[index].id + 1;
    }
  }
};
