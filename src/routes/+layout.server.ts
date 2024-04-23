export function load({ cookies }) {
    return {
        bearer: cookies.get('bearer'),
        username: cookies.get('username'),
        avatar: cookies.get('avatar'),
    }
};