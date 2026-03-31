import { Task } from "@/api/task";

type BarItem = {
    value: number;
    label: string;
}

export const getWeeklyProgress = (task: Task[]): BarItem[] => {
    const result: BarItem[] = [];
    const today = new Date();

    const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    for (let i = 6; i >= 0; i--) {
        const current = new Date()
        current.setDate(today.getDate() - i)
        const dateStr = current.toISOString().split('T')[0]

        const dailyTasks = task.filter(t => t.date === dateStr);
        const completed = dailyTasks.filter(t => t.done).length;

        const progress = dailyTasks.length > 0 ? (completed / dailyTasks.length) * 100 : 0;

        const dayIndex = current.getDay();

        result.push({ value: progress, label: dayLabels[dayIndex] });
    }
    return result;
}