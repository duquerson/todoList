import z from "zod";

export const IDschema = z.object({
	id: z.string().uuid(),
});
