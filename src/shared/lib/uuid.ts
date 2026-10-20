/**
 * Genera un identificador único (UUID v4) sin depender de la disponibilidad
 * de `crypto.randomUUID` (no existe en contextos no seguros como http://).
 */
export const createTodoId = (): string => {
	const cryptoApi = typeof globalThis !== "undefined" ? globalThis.crypto : undefined;

	if (cryptoApi && typeof cryptoApi.randomUUID === "function") {
		return cryptoApi.randomUUID();
	}

	const bytes = new Uint8Array(16);
	if (cryptoApi && typeof cryptoApi.getRandomValues === "function") {
		cryptoApi.getRandomValues(bytes);
	} else {
		for (let index = 0; index < bytes.length; index += 1) {
			bytes[index] = Math.floor(Math.random() * 256);
		}
	}

	// Marcadores de versión (4) y variante (RFC 4122)
	bytes[6] = (bytes[6] & 0x0f) | 0x40;
	bytes[8] = (bytes[8] & 0x3f) | 0x80;

	const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
};
