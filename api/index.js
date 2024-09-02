/* eslint-disable no-undef */
import express from "express";
import routerApi from "./routes/index.js";

const PORT = process.env.PORT || process.env.PORT_DEFAULT || 3000;
const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.get("/API/v1/", (_req, res) => res.send("is RUNNING !!!!!"));

routerApi(app);

try {
	app.listen(PORT, () => console.log(`Server running on ${PORT}`));
} catch (error) {
	console.error(`Error starting server: ${error}`);
	process.exit(1);
}
