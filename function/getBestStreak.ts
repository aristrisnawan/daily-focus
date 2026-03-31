import { Task } from "@/api/task";
import { getCompletedDates } from "./getCompletedDates";

export const getBestStreak = (tasks: Task[]) => {
  const completedDates = getCompletedDates(tasks);

  let best = 0;
  let current = 0;

  for (let i = 0; i < completedDates.length; i++) {
    if (i === 0) {
      current = 1;
    } else {
      const prev = new Date(completedDates[i - 1]);
      const curr = new Date(completedDates[i]);

      const diff =
        (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        current++;
      } else {
        current = 1;
      }
    }

    if (current > best) {
      best = current;
    }
  }

  return best;
};