// export const API_URL = 'http://10.152.186.57:3000';
export const API_URL = 'http://10.65.50.36:3000';




export interface Task {
  id: string;
  title: string;
  done: boolean;
  description?: string;
  date?: string;
}

export async function fetchTasks(): Promise<Task[]> {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    return data;
}

export async function updateTaskStatus(task: Task): Promise<Task> {
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

export async function addTask(taskData: { title: string; description?: string; date?: string }): Promise<Task> {
    const task: Task = {
        id: Date.now().toString(),
        title: taskData.title,
        description: taskData.description,
        date: taskData.date,
        done: false,
    }
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error('Failed to add task');
    }
    const data = await response.json();
    return data;
}

