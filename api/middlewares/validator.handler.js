import createError from "http-errors";

//--> Middleware de validación usando Zod
export const validate = (schema) => (req, res, _next) => {
	const validationResult = schema.safeParse(req.body); // Puedes usar req.body o req.params según el caso

	if (!validationResult.success) {
		//--> Si la validación falla, lanza un error 400 con los detalles de Zod
		throw createError(400, "Datos inválidos", { errors: validationResult.error.errors });
	}

	//--> Si pasa la validación, almacena los datos validados y sigue
	req.validData = validationResult.data;
	_next();
};
