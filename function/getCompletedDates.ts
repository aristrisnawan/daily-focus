import { Task } from "@/api/task";

export const getCompletedDates = (tasks: Task[]) => {
  const map = new Map<string, boolean>();

  tasks.forEach(task => {
    if (!task.date) return;

    const date = task.date.split('T')[0];

    if (task.done) {
      map.set(date, true);
    } else if (!map.has(date)) {
      map.set(date, false);
    }
  });

  return Array.from(map.entries())
    .filter(([_, done]) => done)
    .map(([date]) => date)
    .sort(); 
};