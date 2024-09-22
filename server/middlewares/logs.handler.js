export const logErrors = (err, req, res, next) => {
	if (process.env.NODE_ENV === "development") {
		console.log(`Error at ${new Date().toISOString()}: ${err.message}`);
		console.error(err);
	}

	next(err);
};
