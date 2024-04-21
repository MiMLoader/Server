import { Elysia } from 'elysia';

const app = new Elysia({ prefix: '/docs' })
    .get('/', Bun.file('docs.html'))
    .get('/README.md', Bun.file('docs.md'));

type RequestHandler = (v: { request: Request; }) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);