/* eslint-disable indent */
import express from "express";
import { supabase as DB } from "../../services/conectDB.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const { data, error } = await DB.from("TODOS").select("*");
	if (error) return res.status(500).json({ error: error.message });
	return res.status(200).json(data);
});

router.post("/", async (req, res) => {
	const item = req.body;
	const { data, error } = await DB.from("TODOS").insert(item);
	if (error) return res.status(500).json({ error: error.message });
	return res.status(201).json(data);
});

router.put("/:id", async (req, res) => {
	const todos = req.body;
	try {
		const { error } = await DB.from("TODOS").upsert(todos);

		if (error) return res.status(500).json({ error: error.message });
	} catch (error) {
		console.error("Error en PUT:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
});

router.delete("/:id?", async (req, res) => {
	try {
		const { id } = req.params;
		let query = DB.from("TODOS").delete();

		if (id) {
			query = query.eq("id", id);
		} else {
			query = query.eq("completed", true);
		}
		const { error } = await query;
		if (error) {
			throw new Error(error.message);
		}
		res.status(200).send("Todo(s) deleted successfully");
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
