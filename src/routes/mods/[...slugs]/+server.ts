import { Elysia } from 'elysia';

const app = new Elysia({ prefix: '/mods' });

app.get('/', ({ set }) => {
    set.redirect = '/mods/explore/';
    set.status = 'Permanent Redirect';
    return 'redirecting';
});

type RequestHandler = (v: { request: Request; }) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);