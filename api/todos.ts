import { VercelRequest, VercelResponse } from '@vercel/node';
import helmet from 'helmet';
import { supabase } from '../src/services/conectDB';
const handlers = {
    GET: async (req, res) => {
        try {
            const { data: TODOS, error } = await supabase.from('TODOS').select('*');
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.setHeader('Content-Security-Policy', "default-src 'self'");
            res.status(200).json(TODOS);
        } catch (error) {
            console.error('Error en GET:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    POST: async (req, res) => {
        try {
            console.log(req.body);
            const newTodo = req.body;
            const { error } = await supabase.from('TODOS').insert(newTodo);
            if (error) return res.status(500).json({ error: error.message });
            res.setHeader('Content-Security-Policy', "default-src 'self'");
            res.status(201).send('Todo added successfully');

        } catch (error) {
            console.error('Error en POST:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    PUT: async (req, res) => {
        try {
            const todos = req.body;
            const { error } = await supabase.from('TODOS').upsert(todos);
            if (error) return res.status(500).json({ error: error.message });

            res.setHeader('Content-Security-Policy', "default-src 'self'");
            res.status(200).send('Todos updated successfully');

        } catch (error) {
            console.error('Error en PUT:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    DELETE: async (req, res) => {
        const { id } = req.body;

        let query = supabase.from('TODOS').delete();

        if (id) {
            query = query.eq('id', id);
        } else {
            query = query.eq('completed', true);
        }
        const { error } = await query;

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).send('Todo(s) deleted successfully');
    }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
