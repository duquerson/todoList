/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
/* eslint-disable no-undef */
import express from "express";
//import helmet from "helmet";
import api from "./routes/index.js";
//const whitelist = ["todo-list-git-main-duquersons-projects.vercel.app"];
/*const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};*/

const app = express();
app.disable("x-powered-by");
//app.use(cors(corsOptions));
//app.use(helmet());
//app.use();
app.use(express.json());

app.use("/api", api);

// Manejo de errores
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Algo salió mal!");
});

const PORT = process.env.PORT || process.env.PORT_DEFAULT || 1234;

try {
	app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/api`));
} catch (error) {
	console.error(`Error starting server: ${error}`);
	process.exit(1);
}
//review port
