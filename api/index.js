import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { fileURLToPath } from "node:url";
import path from "path";
import { errorHandler } from "./middlewares/error.handler.js";
import { logErrors } from "./middlewares/logs.handler.js";
import todosRoute from "./routes/todosRoute.js";
//declarations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//const PORT = process.env.PORT || process.env.PORT_DEFAULT || 3000;
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: "Too many requests, please try again later.",
});
const data = {
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'"],
			styleSrc: ["'self'", "https://fonts.googleapis.com"],
			imgSrc: ["'self'"],
			fontSrc: ["'self'", "https://fonts.gstatic.com"],
			connectSrc: ["'self'"],
			mediaSrc: ["'self'"],
			objectSrc: ["'none'"],
			frameSrc: ["'self'"],
			workerSrc: ["'self'"],
			childSrc: ["'self'"],
			formAction: ["'self'"],
			frameAncestors: ["'self'"],
			baseUri: ["'self'"],
			upgradeInsecureRequests: [],
		},
	},
};
//server side
const app = express();
app.disable("x-powered-by");
app.use(
	helmet({
		...data,
		frameguard: { action: "deny" },
		xssFilter: true,
		hsts: { maxAge: 31536000, includeSubDomains: true },
		noSniff: true,
	})
);
app.set("trust proxy", true);
app.use(limiter);
app.use(express.json({ limit: "10kb" }));
app.use((req, res, next) => {
	res.setHeader("Cache-Control", "no-store");
	res.setHeader("Pragma", "no-cache");
	next();
});

app.use("/node_modules", (req, res, _next) => {
	res.status(403).send({ message: "Access Denied" });
});
app.use(
	"/",
	express.static(path.resolve(__dirname, "../dist"), {
		setHeaders: (res, path) => {
			if (path.endsWith(".html")) {
				res.setHeader("Content-Type", "text/html");
			}
		},
		extensions: ["html", "css", "js"],
	})
);
//routerApi(app);
app.use("/todos", todosRoute);
app.use(logErrors);
app.use(errorHandler);

app.use((req, res, _next) => {
	res.status(404).json({
		message: "Not Found - try later or another path",
		url: req.originalUrl,
	});
});
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
export default app;
