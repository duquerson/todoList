
import { todos } from "../types/type";
const API = import.meta.env.VITE_VERCEL_ENV_URL
const MASTER = import.meta.env.VITE_VERCEL_ENV_MASTER
const ACCESS = import.meta.env.VITE_VERCEL_ENV_ACCESS
const headers = {
    'Content-Type': 'application/json',
    'X-Master-Key': MASTER,
    'X-Access-Key': ACCESS,
};

export const fetchSchemaDoc = async (): Promise<todos> => {
    const response = await fetch(API, { method: 'GET', headers });
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    const { record: TODOS } = await response.json() as { record: todos };
    return TODOS;
};

export const updateSchemaDoc = async (todos: todos): Promise<void> => {
    const response = await fetch(API, {
        method: 'PUT',
        headers,
        body: JSON.stringify(todos),
    });
    if (!response.ok) {
        throw new Error('Failed to update todos');
    }
};
