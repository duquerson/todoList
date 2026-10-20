interface ErrorBannerProps {
	message: string;
	title?: string;
	onRetry?: () => void;
	onDismiss?: () => void;
}

/**
 * Banner de error con contexto y acciones de recuperación (reintentar / descartar).
 */
export const ErrorBanner = ({ message, title = "Algo salió mal", onRetry, onDismiss }: ErrorBannerProps) => {
	return (
		<div
			role="alert"
			className="mx-auto mt-4 flex max-w-[550px] items-start justify-between gap-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300"
		>
			<div>
				<p className="font-bold">{title}</p>
				<p className="mt-1 break-words">{message}</p>
			</div>
			<div className="flex shrink-0 items-center gap-2">
				{onRetry && (
					<button
						type="button"
						onClick={onRetry}
						className="rounded-md border border-red-500/50 px-3 py-1 font-semibold transition-transform duration-300 hover:scale-105"
					>
						Reintentar
					</button>
				)}
				{onDismiss && (
					<button
						type="button"
						onClick={onDismiss}
						aria-label="Descartar error"
						className="rounded-md px-2 py-1 text-lg font-bold transition-transform duration-300 hover:scale-110"
					>
						✕
					</button>
				)}
			</div>
		</div>
	);
};
