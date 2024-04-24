import { Elysia } from 'elysia';
import { DiscordAuth, Scopes } from 'discord-auth.ts';
import type { AccessToken } from 'discord-auth.ts/src/interfaces/user/accessToken';

const app = new Elysia({ prefix: '/auth' });

if (!Bun.env.DISCORD_SECRET) throw new Error('Add discord secret to env file');
const oauth2 = new DiscordAuth('1179513611719295106', Bun.env.DISCORD_SECRET, 'http://localhost:5173/auth/callback', [Scopes.IDENTIFY]);

app.get('/', ({ set }) => {
    const oauth2Link = oauth2.getAuthUrl();
    set.redirect = oauth2Link;
    return 'redirecting to discord';
});

app.get('/callback', async ({ query: { code, error }, set, cookie: { bearer, avatar, username } }) => {
    if (!code || error) {
        set.status = 'Bad Request';
        return 'Bad Request';
    }
    const accessToken = await oauth2.accessHandler().tokenExchange(code) as AccessToken;
    const userData = await oauth2.user(accessToken).getUser();
    const avatarURL = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;

    bearer.set({
        value: accessToken.access_token,
        path: '/',
        maxAge: accessToken.expires_in,
        expires: new Date(accessToken.expires_in),
        sameSite: 'none',
        httpOnly: true,
        secure: true,
    });

    avatar.set({
        value: avatarURL,
        path: '/',
        maxAge: accessToken.expires_in,
        expires: new Date(accessToken.expires_in),
        sameSite: 'none',
        httpOnly: true,
        secure: true,
    });

    username.set({
        value: userData.username,
        path: '/',
        maxAge: accessToken.expires_in,
        expires: new Date(accessToken.expires_in),
        sameSite: 'none',
        httpOnly: true,
        secure: true,
    });

    set.redirect = '/';
    set.status = 'Permanent Redirect';
    return 'Redirecting';
});

app.get('/logout', ({ cookie: { bearer, avatar, username }, set }) => {
    bearer.set({
        maxAge: 0,
        path: '/',
    });
    avatar.set({
        maxAge: 0,
        path: '/',
    });
    username.set({
        maxAge: 0,
        path: '/',
    });

    set.redirect = '/?referer=/auth/logout';
    set.status = 'Permanent Redirect';
    return 'Redirecting';
});

type RequestHandler = (v: { request: Request; }) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);