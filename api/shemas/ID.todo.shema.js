import z from "zod";

export const IDschema = z.object({
	id: z.string().uuid().min(1, { message: "missing ID" }), // Por ejemplo, validación opcional de un UUID
});
