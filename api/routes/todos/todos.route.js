/* eslint-disable indent */
import express from "express";
import createError from "http-errors";
import { validate } from "../../middlewares/validate.js";
import { IDschema } from "../../schemas/id.schema.js";
import { todoSchema } from "../../schemas/todo.schema.js";
import { supabase as DB } from "../../services/conectDB.js";
import TodosService from "../../services/todos.service.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const { todos, error } = await TodosService.getTodos();
		if (error) throw createError(500, "Error en la consulta", { cause: error });
		res.status(200).json({ todos });
	} catch (error) {
		next(error);
	}
});

router.post("/", validate(todoSchema), async (req, res, next) => {
	try {
		const item = req.body;
		const { todos, error } = await TodosService.addTodo(item);
		if (error) throw createError(500, "Error add", { cause: error });
		res.status(201).json(todos);
	} catch (error) {
		next(error);
	}
});

router.put("/:id", validate(IDschema), async (req, res, next) => {
	try {
		const todos = req.body;
		const { error } = await DB.from("TODOS").upsert(todos);
		if (error) throw createError(500, "Error update single", { cause: error });
		res.status(201);
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", validate(IDschema), async (req, res, next) => {
	try {
		const { id } = req.params;
		const { error } = await DB.from("TODOS").delete().eq("id", id);
		if (error) throw createError(500, "Error update single", { cause: error });
		res.status(200).send("Todo deleted successfully");
	} catch (err) {
		next(err);
	}
});

router.delete("/", async (req, res, next) => {
	try {
		const { error } = await DB.from("TODOS").delete().eq("completed", true);
		if (error) throw createError(500, "Error delete", { cause: error });
		res.status(20).send("Todo(s) deleted successfully");
	} catch (error) {
		next(error);
	}
});
export default router;
