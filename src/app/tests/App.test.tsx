// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "../App";
import { AppProvider } from "../providers/AppProvider";

afterEach(() => {
	cleanup();
	vi.restoreAllMocks();
	window.localStorage.clear();
});

const renderApp = async () => {
	await act(async () => {
		render(
			<AppProvider>
				<App />
			</AppProvider>,
		);
	});
};

const waitForReady = () => waitFor(() => expect(screen.getByText("No hay tareas para mostrar.")).toBeDefined());

const addTodo = async (description: string) => {
	const input = screen.getByPlaceholderText("Create a new todo...");
	fireEvent.change(input, { target: { value: description } });
	fireEvent.submit(input.closest("form")!);
};

describe("App", () => {
	it("renderiza la aplicación", async () => {
		await renderApp();
		expect(screen.getByRole("heading", { name: "TODO" })).toBeDefined();
	});

	it("crea una tarea y la persiste en el almacenamiento local", async () => {
		await renderApp();
		await waitForReady();

		await addTodo("Nueva tarea");

		await waitFor(() => {
			expect(screen.getByText("Nueva tarea")).toBeDefined();
		});

		const stored = window.localStorage.getItem("TODOS");
		expect(stored).toBeTruthy();
		expect(JSON.parse(stored ?? "[]")).toHaveLength(1);
	});

	it("revierte el cambio optimista y avisa cuando no se puede guardar", async () => {
		await renderApp();
		await waitForReady();

		vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new Error("CuotaExceededError");
		});

		await addTodo("Tarea que no se guarda");

		await waitFor(() => {
			expect(screen.getByText(/No se pudo guardar la tarea/)).toBeDefined();
		});
		expect(screen.queryByText("Tarea que no se guarda")).toBeNull();
	});

	it("muestra un error de carga con opción de reintento", async () => {
		vi.spyOn(Storage.prototype, "getItem").mockImplementation((key: string) => (key === "TODOS" ? "{roto" : null));

		await renderApp();

		await waitFor(() => {
			expect(screen.getByText("No se pudieron cargar tus tareas")).toBeDefined();
		});
		expect(screen.getByRole("button", { name: "Reintentar" })).toBeDefined();
	});
});
