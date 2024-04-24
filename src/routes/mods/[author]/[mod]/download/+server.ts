import { Elysia } from 'elysia';

export const prerender = false;

const app = new Elysia({ prefix: '/mods' });

app.get('/:author/:name/download', ({ params: { author, name }, query: { version }, set }) => {
    author = author.toLowerCase();
    name = name.toLowerCase();
    if (!version) {
        set.status = 'Bad Request';
        return 'Bad Request';
    }

    set.redirect = `https://modcdn-worker.astraeffect.workers.dev/${author}+${name}@${version}.zip`;
    return;
});

type RequestHandler = (v: { request: Request; }) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);