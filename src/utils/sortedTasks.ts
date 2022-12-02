interface TaskType {
  id: number;
  status: boolean;
  task: string;
}
export function sortedTasks(tasks: TaskType[]): TaskType[] {
  return tasks.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
}
