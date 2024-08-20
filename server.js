/* eslint-disable indent */
/* eslint-disable no-undef */
import cors from "cors";
import express from "express";
import api from "./api/index.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", api);
const PORT = process.env.PORT || process.env.PORT_DEFAULT || 5000;

try {
	app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
} catch (error) {
	console.error(`Error starting server: ${error}`);
	process.exit(1);
}
