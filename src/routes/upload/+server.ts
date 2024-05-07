import { Elysia, t } from 'elysia';

const app = new Elysia({ prefix: '/upload' });

app.post('/', ({ body, set }) => {
    const modUrl = `https://modcdn-worker.astraeffect.workers.dev/${body.modJson.author}+${body.modJson.name}@${body.modJson.version}.zip`.toLowerCase();

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${Bun.env.AUTH_KEY_SECRET}`);

    fetch('https://modcdn-worker.astraeffect.workers.dev/db', {
        headers: headers,
        body: JSON.stringify(body.modJson)
    }).then(() => {
        headers.append('Content-Type', 'application/zip');

        fetch(modUrl, {
            method: 'PUT',
            body: body.modZip,
            headers: headers
        }).catch((e) => {
            set.status = 500;
            return e;
        });
    });

    return 200;
}, {
    body: t.Object({
        modJson: t.ObjectString({
            name: t.String(),
            author: t.String(),
            description: t.String(),
            version: t.String(),
            tags: t.Array(t.String()) || t.Null(),
        }),
        modZip: t.File()
    })
});

type RequestHandler = (v: { request: Request; }) => Response | Promise<Response>;

export const POST: RequestHandler = ({ request }) => app.handle(request);