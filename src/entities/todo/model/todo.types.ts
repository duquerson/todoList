export interface Todo {
	id: string;
	description: string;
	completed: boolean;
}

export type Todos = Todo[];

export const FILTER = {
	ALL: "all",
	ACTIVE: "active",
	COMPLETED: "completed",
} as const;

export type FilterValue = (typeof FILTER)[keyof typeof FILTER];

export type LoadStatus = "idle" | "loading" | "ready" | "error";
