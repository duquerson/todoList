export const logErrors = (err, req, res, _next) => {
	console.log("Log errors");
	console.error();
	"Error handler", err;
	_next(err);
};
