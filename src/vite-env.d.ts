/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_VERCEL_ENV_URL: string;
	readonly VITE_VERCEL_ENV_MASTER: string;
	readonly VITE_VERCEL_ENV_ACCESS: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
