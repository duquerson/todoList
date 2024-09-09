/* eslint-disable no-undef */
import cors from "cors";
import express from "express";
import { errorHandler } from "./middlewares/error.handler.js";
import { logErrors } from "./middlewares/logs.handler.js";
import routerApi from "./routes/index.js";

const PORT = process.env.PORT || process.env.PORT_DEFAULT || 3000;
const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(cors());

app.get("/API/v1/", (_req, res) => res.send("is RUNNING !!!!!"));

routerApi(app);
app.use(logErrors);
app.use(errorHandler);

app.use((req, res, _next) => {
	res.status(404).json({
		message: "Not Found - La ruta que buscas no existe",
		url: req.originalUrl,
	});
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
