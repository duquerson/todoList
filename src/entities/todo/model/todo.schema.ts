import { z } from "zod";

export const todoSchema = z.object({
	id: z.string().min(1, { message: "El identificador de la tarea no puede estar vacío" }),
	description: z.string().min(1, { message: "La descripción no puede estar vacía" }).max(255, { message: "La descripción es demasiado larga" }),
	completed: z.boolean(),
});

export const todosSchema = z.array(todoSchema);

export const newTodoSchema = z.object({
	description: z
		.string()
		.trim()
		.min(1, { message: "La descripción no puede estar vacía" })
		.max(255, { message: "La descripción es demasiado larga" }),
});
