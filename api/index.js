/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
/* eslint-disable no-undef */
import express from "express";
import helmet from "helmet";
import api from "./routes/index.js";
const whitelist = ["https://todo-list-flame-one-80.vercel.app/"];
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

const app = express();
app.disable("x-powered-by");
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use("/api", api);
app.use("/", (req, res) => {
	res.redirect("/api");
});
// Manejar cualquier otra ruta no definida
app.use((req, res, next) => {
	res.status(404).send("No se encontró la ruta solicitada.");
});
// Manejo de errores
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Algo salió mal!");
});

const PORT = process.env.PORT || process.env.PORT_DEFAULT || 3000;

try {
	app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/api`));
} catch (error) {
	console.error(`Error starting server: ${error}`);
	process.exit(1);
}
//review port
