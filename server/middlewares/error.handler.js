import createError from "http-errors";

// Middleware de manejo de errores
export const errorHandler = (err, req, res, _next) => {
	//--> Verifica si es un error generado con http-errors
	if (createError.isHttpError(err)) {
		return res.status(err.status || 500).json({
			statusCode: err.status,
			message: err.message,
			errors: err.errors || null, //--> Los errores de validación de Zod estarán aquí
		});
	}

	//--> En caso de un error inesperado
	res.status(500).json({
		message: "Error interno del servidor",
		error: err.message,
	});
};
