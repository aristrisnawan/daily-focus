import { Task } from "@/api/task";
import { getCompletedDates } from "./getCompletedDates";

export const getCurrentStreak = (tasks: Task[]) => {
  const completedDates = getCompletedDates(tasks);

  let streak = 0;
  let currentDate = new Date();

  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0];

    if (completedDates.includes(dateStr)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};