import { z } from 'zod';

export const todoSchema = z.object({
    id: z.string().uuid(),
    description: z.string().min(1, { message: "La descripción no puede estar vacía" }).max(255, { message: "La descripción es demasiado larga" }),
    completed: z.boolean()
});

export type Todo = z.infer<typeof todoSchema>;
