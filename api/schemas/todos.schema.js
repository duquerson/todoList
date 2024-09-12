import { z } from "zod";
import { todoSchema } from "./todo.schema";
export const todosSchema = z.array(todoSchema);
