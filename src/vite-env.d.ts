/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL: string;
	readonly VITE_MASTER_KEY: string;
	readonly VITE_ACCESS_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
