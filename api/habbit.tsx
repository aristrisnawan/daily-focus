import { API_URL } from "./task";

interface Habit {
    id: string;
    name: string;
    icon?: string;
    done: boolean;
}

interface HabitLog {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
}

export async function fetchHabitsLog(): Promise<HabitLog[]> {
    const response = await fetch(`${API_URL}/habitLogs`);
    if (!response.ok) {
        throw new Error('Failed to fetch habit logs');
    }
    const data = await response.json();
    return data;
}

export async function fetchHabits(): Promise<Habit[]> {
    const response = await fetch(`${API_URL}/habits`);
    if (!response.ok) {
        throw new Error('Failed to fetch habits');
    }
    const data = await response.json();
    return data;
}

export async function updateHabitSatatus(habit: Habit): Promise<Habit> {
    const response = await fetch(`${API_URL}/habits/${habit.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(habit),
    });
    if (!response.ok) {
        throw new Error('Failed to update habit');
    }
    const data = await response.json();
    return data;

}