import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind resolviendo conflictos de forma determinista.
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
