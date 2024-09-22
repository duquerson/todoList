import createError from "http-errors";

//--> Middleware de validación usando Zod
export const validate = (schema, source = "body") => {
	return (req, res, next) => {
		const dataToValidate = req[source];
		const validationResult = schema.safeParse(dataToValidate);

		if (!validationResult.success) {
			//--> Si la validación falla, lanza un error 400 con los detalles de Zod
			return next(createError(400, "Datos inválidos", { errors: validationResult.error.errors }));
		}

		//--> Si pasa la validación, almacena los datos validados y sigue
		req.validData = validationResult.data;
		next();
	};
};
