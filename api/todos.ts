import { VercelRequest, VercelResponse } from '@vercel/node';
import csurf from 'csurf';
import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { supabase } from '../src/services/conectDB';
const csrfProtection = csurf({ cookie: true });
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
});
const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "trusted-cdn.com"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
    referrerPolicy: { policy: 'no-referrer' },
}));
app.use(limiter);
app.use(csrfProtection);

// CRUD endpoints
app.get('/api/todos', async (req: Request, res: Response)=>{
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
});
app.post('/api/todos',csrfProtection, async (req: Request, res: Response)=>{
    try {
        const newTodo = req.body;
        const { error } = await supabase.from('TODOS').insert(newTodo);
        if (error) return res.status(500).json({ error: error.message });
        res.setHeader('Content-Security-Policy', "default-src 'self'");
        res.status(201).send('Todo added successfully');

    } catch (error) {
        console.error('Error en POST:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
app.put('/api/todos', csrfProtection,async(req: Request, res: Response)=>{
    const todos = req.body;
    try {
        const { error } = await supabase.from('TODOS').upsert(todos);
        if (error) return res.status(500).json({ error: error.message });

        res.setHeader('Content-Security-Policy', "default-src 'self'");
        res.status(200).send('Todos updated successfully');

    } catch (error) {
        console.error('Error en PUT:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
app.delete('/api/todos/:id?', csrfProtection, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        let query = supabase.from('TODOS').delete();

        if (id) {
            query = query.eq('id', id);
        } else {
            query = query.eq('completed', true);
        }
        const { error } = await query;
        if (error) {
            throw new Error(error.message);
        }
        res.status(200).send('Todo(s) deleted successfully');
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

export default (req: VercelRequest, res: VercelResponse) => {
    res.removeHeader('X-Powered-By');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    app(req, res);
};

