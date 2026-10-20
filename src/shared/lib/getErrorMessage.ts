/**
 * Extrae un mensaje legible de cualquier error desconocido.
 * Los errores de dominio ya traen un mensaje amigable, por lo que se prioriza.
 */
export const getErrorMessage = (error: unknown, fallback: string): string => {
	if (error instanceof Error && error.message.trim().length > 0) {
		return error.message;
	}
	return fallback;
};
