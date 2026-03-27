import { API_URL } from "./task";

interface Habit {
    id: string;
    name: string;
    icon?: string;
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