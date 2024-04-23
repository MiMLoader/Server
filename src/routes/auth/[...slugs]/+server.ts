import { Elysia } from 'elysia';
import { DiscordAuth, Scopes } from 'discord-auth.ts';

const app = new Elysia({ prefix: '/auth' });

if (!Bun.env.DISCORD_SECRET) throw new Error('Add discord secret to env file');
const oauth2 = new DiscordAuth('1179513611719295106', Bun.env.DISCORD_SECRET, 'http://localhost:5173/auth/callback', [Scopes.IDENTIFY]);


app.get('/', ({ set }) => {
    const oauth2Link = oauth2.getAuthUrl();
    set.redirect = oauth2Link;
    return 'redirecting to discord';
});

app.get('/callback', async ({ query: { code }, set }) => {
    if (!code) {
        set.status = 'Bad Request';
        return;
    }
    const accessToken = await oauth2.accessHandler().tokenExchange(code);
    // @ts-ignore
    const userData = await oauth2.user(accessToken).getUser();

    const token = await oauth2.user(accessToken).getAccessToken();

    const avatar = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;

    return { userData, avatar, token };
});

type RequestHandler = (v: { request: Request; }) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);