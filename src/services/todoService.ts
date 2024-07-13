import { todos } from "../types/type"
import { API_URL, ACCESS_KEY, MASTER_KEY } from '../secret.ts'
const API = import.meta.env.VITE_API_URL || API_URL ;
const MASTER = import.meta.env.VITE_MASTER_KEY || MASTER_KEY;
const ACCESS = import.meta.env.VITE_ACCESS_KEY || ACCESS_KEY;
const headers = {
    'Content-Type': 'application/json',
    'X-Master-Key': MASTER,
    'X-Access-Key': ACCESS,
};

export const fetchTodos = async (): Promise<todos> => {
    const response = await fetch(API, { method: 'GET', headers });
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    const { record: TODOS } = await response.json() as { record: todos };
    return TODOS;
};

export const updateTodos = async (todos: todos): Promise<void> => {
    const response = await fetch(API, {
        method: 'PUT',
        headers,
        body: JSON.stringify(todos),
    });
    if (!response.ok) {
        throw new Error('Failed to update todos');
    }
};
