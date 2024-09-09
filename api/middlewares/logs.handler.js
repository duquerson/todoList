export const logErrors = (err, req, res, _next) => {
	console.log(`Log errors at ${new Date().toISOString()}: ${err.message}`);

	console.error(err);
	_next(err);
};
