export const logErrors = (err, req, res, next) => {
	console.log(`Log errors at ${new Date().toISOString()}: ${err.message}`);

	console.error(err);
	next(err);
};
