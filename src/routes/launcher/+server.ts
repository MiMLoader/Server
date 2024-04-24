import { Elysia } from 'elysia';

const app = new Elysia({ prefix: '/launcher' });

app.get('/', ({ set }) => {
    set.redirect = 'https://github.com/MiMLoader/MiMLauncher';
    set.status = 'Permanent Redirect';
    return 'redirecting';
});

type RequestHandler = (v: { request: Request; }) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);