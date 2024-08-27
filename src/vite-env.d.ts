/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_URL: string;
	readonly VITE_ANON: string;
	readonly VITE_SERVICE_ROL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
