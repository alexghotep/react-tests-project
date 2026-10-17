const BASE_URL = 'https://dev.ghotep.ru/api';

export interface Task {
    id: number;
    text: string;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });

    if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
}

export const alphaApi = {
    getCounter: (signal?: AbortSignal) =>
        request<{ count: number }>('/counter.php', { signal }),

    updateCounter: (count: number, signal?: AbortSignal) =>
        request<ApiResponse>('/counter.php', {
            method: 'POST',
            body: JSON.stringify({ count }),
            signal,
        }),

    getUser: (signal?: AbortSignal) =>
        request<{ name: string }>('/user.php', { signal }),

    saveUser: (name: string, signal?: AbortSignal) =>
        request<{ success: boolean; name: string }>('/user.php', {
            method: 'POST',
            body: JSON.stringify({ name }),
            signal,
        }),

    getTasks: (signal?: AbortSignal) =>
        request<{ tasks: Task[] }>('/tasks.php', { signal }),

    addTask: (text: string, signal?: AbortSignal) =>
        request<{ success: boolean; task: Task }>('/tasks.php', {
            method: 'POST',
            body: JSON.stringify({ text }),
            signal,
        }),

    deleteTask: (id: number, signal?: AbortSignal) =>
        request<{ success: boolean }>(`/tasks.php?id=${id}`, {
            method: 'DELETE',
            signal,
        }),
};