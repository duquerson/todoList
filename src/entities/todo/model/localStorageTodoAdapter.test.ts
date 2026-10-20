import { describe, expect, it } from "vitest";
import { LocalStorageTodoAdapter } from "./localStorageTodoAdapter";
import { TodoStorageError } from "./todo.errors";
import { Todo } from "./todo.types";

class MemoryStorage implements Storage {
	private store = new Map<string, string>();

	get length(): number {
		return this.store.size;
	}

	clear(): void {
		this.store.clear();
	}

	getItem(key: string): string | null {
		return this.store.get(key) ?? null;
	}

	key(index: number): string | null {
		return Array.from(this.store.keys())[index] ?? null;
	}

	removeItem(key: string): void {
		this.store.delete(key);
	}

	setItem(key: string, value: string): void {
		this.store.set(key, value);
	}
}

const todo: Todo = { id: "1", description: "Primera tarea", completed: false };

const createAdapter = () => new LocalStorageTodoAdapter(new MemoryStorage());

describe("LocalStorageTodoAdapter", () => {
	it("devuelve una lista vacía cuando no hay datos guardados", async () => {
		const adapter = createAdapter();
		await expect(adapter.getTodos()).resolves.toEqual([]);
	});

	it("guarda y recupera las tareas", async () => {
		const adapter = createAdapter();
		await adapter.addTodo(todo);
		await expect(adapter.getTodos()).resolves.toEqual([todo]);
	});

	it("actualiza el estado de una tarea", async () => {
		const adapter = createAdapter();
		await adapter.addTodo(todo);
		await adapter.setTodoCompleted(todo.id, true);
		await expect(adapter.getTodos()).resolves.toEqual([{ ...todo, completed: true }]);
	});

	it("elimina una tarea por id", async () => {
		const adapter = createAdapter();
		await adapter.addTodo(todo);
		await adapter.deleteTodo(todo.id);
		await expect(adapter.getTodos()).resolves.toEqual([]);
	});

	it("elimina solo las tareas completadas", async () => {
		const adapter = createAdapter();
		await adapter.addTodo(todo);
		await adapter.addTodo({ id: "2", description: "Segunda tarea", completed: true });
		await adapter.deleteCompletedTodos();
		await expect(adapter.getTodos()).resolves.toEqual([todo]);
	});

	it("falla con un error de almacenamiento si el JSON es inválido", async () => {
		const storage = new MemoryStorage();
		storage.setItem("TODOS", "{no es json");
		const adapter = new LocalStorageTodoAdapter(storage);

		await expect(adapter.getTodos()).rejects.toBeInstanceOf(TodoStorageError);
	});

	it("falla con un error de almacenamiento si el formato no coincide", async () => {
		const storage = new MemoryStorage();
		storage.setItem("TODOS", JSON.stringify([{ id: "1", description: "Tarea" }]));
		const adapter = new LocalStorageTodoAdapter(storage);

		await expect(adapter.getTodos()).rejects.toBeInstanceOf(TodoStorageError);
	});
});
