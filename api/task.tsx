const API_URL = 'http://10.152.186.57:3000';


interface HabitLog {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
}

interface Habit {
  id: string;
  name: string;
  icon: string;
}

export interface Task {
  id: string;
  title: string;
  done: boolean;
  date?: string;
}

export async function fetchTasks(): Promise<Task[]> {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    console.log('fetched tasks', data)
    return data;
}

export async function updateTodoStatus(task: Task): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${task.id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error('Failed to update task');
    }
    const data = await response.json();
    return data;
}

