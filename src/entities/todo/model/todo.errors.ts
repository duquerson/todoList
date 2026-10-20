/** Error de negocio: la entrada del usuario no cumple las reglas del dominio. */
export class TodoValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "TodoValidationError";
	}
}

/** Error de persistencia: no se pudo leer o escribir en el almacenamiento. */
export class TodoStorageError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = "TodoStorageError";
	}
}
