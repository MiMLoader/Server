import { Elysia } from 'elysia';

const app = new Elysia({ prefix: '/mods' });

app.get('/', ({ set }) => {
    set.redirect = '/mods/explore/';
    set.status = 'Permanent Redirect';
    return 'redirecting';
});
// app.get('/:author/:name', ({ params: { author, name }, query: { version } }) => {
//     return { author, name, version };
// });
app.get('/:author/:name/download', ({ params: { author, name }, query: { version }, set }) => {
    author = author.toLowerCase();
    name = name.toLowerCase();
    if (!version) {
        set.status = 'Bad Request';
        return;
    }

    set.redirect = `https://modcdn-worker.astraeffect.workers.dev/${author}+${name}@${version}.zip`;
    return;
});

app.get('modList', () => {
    const fakeModList = [
        {
            author: 'Ahhh_Saturn',
            name: 'mimlAPI',
            description:
                'An API to make modding with Moonstone Island Mod Loader easier.',
            versions: ['1.0.3'],
            tags: ['api', 'devUtility'],
        },
    ];

    return fakeModList;
});

app.onError(({ set }) => {
    set.status = 'Not Found';
    return 'oh :[';
});

type RequestHandler = (v: { request: Request; }) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);