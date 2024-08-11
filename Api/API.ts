import helmet from 'helmet';
import fetch from 'node-fetch';
import { z } from 'zod';

const baseUrl = 'https://api.escuelajs.co/api/v1/categories'; // Reemplaza con la URL de tu API

// Definición de esquemas con Zod
const CategorySchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'), // Validación de cadena no vacía
    // Añade más campos según las necesidades
});

const UuidSchema = z.string().uuid('ID debe ser un UUID válido'); // Validación de UUID

const handlers = {
    GET: async (req, res) => {
        try {
            console.log('Received GET request for /api/');
            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error(`Error al obtener datos: ${response.status}`);
            }
            const data = await response.json();
            res.setHeader('Content-Security-Policy', "default-src 'self'");
            res.status(200).json(data);
        } catch (error) {
            console.error('Error en GET:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    POST: async (req, res) => {
        try {
            console.log('Received POST request for /api/');
            const newCategory = CategorySchema.parse(req.body); // Validación con Zod

            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCategory)
            });
            if (!response.ok) {
                throw new Error(`Error al crear categoría: ${response.status}`);
            }
            const data = await response.json();
            res.setHeader('Content-Security-Policy', "default-src 'self'");
            res.status(201).json(data);
        } catch (error) {
            console.error('Error en POST:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    PUT: async (req, res) => {
        try {
            console.log('Received PUT request for /api/');
            const categoryId = UuidSchema.parse(req.query.id); // Validación de UUID con Zod
            const updatedCategory = CategorySchema.parse(req.body); // Validación de datos con Zod

            const response = await fetch(`${baseUrl}/${categoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCategory)
            });
            if (!response.ok) {
                throw new Error(`Error al actualizar categoría: ${response.status}`);
            }
            const data = await response.json();
            res.setHeader('Content-Security-Policy', "default-src 'self'");
            res.status(200).json(data);
        } catch (error) {
            console.error('Error en PUT:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    DELETE: async (req, res) => {
        try {
            console.log('Received DELETE request for /api/');
            const categoryId = UuidSchema.parse(req.query.id); // Validación de UUID con Zod

            const response = await fetch(`${baseUrl}/${categoryId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Error al eliminar categoría: ${response.status}`);
            }
            res.setHeader('Content-Security-Policy', "default-src 'self'");
            res.status(204).end();
        } catch (error) {
            console.error('Error en DELETE:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

export default async function handler(req, res) {
    // Aplicar Helmet para configurar headers de seguridad
    helmet()(req, res, () => {
        res.removeHeader('X-Powered-By');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

        const methodHandler = handlers[req.method];
        if (methodHandler) {
            methodHandler(req, res);
        } else {
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });
}
