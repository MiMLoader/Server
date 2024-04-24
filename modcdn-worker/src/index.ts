export interface Env {
	MOD_DB: D1Database;
	MOD_BUCKET: R2Bucket;
}
export interface Mod {
	Name: string;
	Author: string;
	Description: string;
	Versions: string[] | string;
	Tags?: string[] | string | null;
}

const hasValidHeader = (request, env) => {
	return request.headers.get('X-Custom-Auth-Key') === env.AUTH_KEY_SECRET;
};

const authorizeRequest = (request, env) => {
	switch (request.method) {
		case 'PUT':
		case 'DELETE':
			return hasValidHeader(request, env);
		case 'GET':
			return true;
		default:
			return false;
	}
};

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const key = url.pathname.slice(1);
		const urlArray = url.pathname.split('/');

		if (!authorizeRequest(request, env)) {
			return new Response('Forbidden', { status: 403 });
		}

		switch (request.method) {
			case 'PUT':
				await env.MOD_BUCKET.put(key, request.body);
				return new Response(`Put ${key} successfully!`);
			case 'GET': {
				if (url.pathname.startsWith('/api')) {
					switch (urlArray[2]) {
						case 'modlist': {
							const { results } = await env.MOD_DB.prepare(
								"SELECT * FROM Mods"
							)
								.all();

							for (let i = 0; i < results.length; i++) {
								if (results[i].Versions.includes(', ')) {
									results[i].Versions = (
										results[i].Versions as string
									).split(', ');
								} else {
									results[i].Versions = [results[i].Versions as string];
								}
								if (results[i].Tags !== undefined) {
									if (results[i].Tags?.includes(', ')) {
										results[i].Tags = (results[i].Tags as string).split(
											', ',
										);
									} else {
										results[i].Tags = [results[i].Tags as string];
									}
								}
							}

							const response = new Response(JSON.stringify(results), {
								headers: {
									"Access-Control-Allow-Origin": "*",
									"Access-Control-Allow-Methods": "GET",
									"Access-Control-Max-Age": "86400",
									"Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers")
								}
							});

							return response;
						}
						case 'mods': {
							const author = urlArray.slice(3, 4)[0];
							const name = urlArray.slice(4, 5)[0];
							console.log(author, name);

							if (!name) {
								const { results } = await env.MOD_DB.prepare(
									"SELECT * FROM Mods WHERE UPPER(Author) = UPPER(?)"
								)
									.bind(author)
									.all();

								for (let i = 0; i < results.length; i++) {
									if (results[i].Versions.includes(', ')) {
										results[i].Versions = (
											results[i].Versions as string
										).split(', ');
									} else {
										results[i].Versions = [results[i].Versions as string];
									}
									if (results[i].Tags !== undefined) {
										if (results[i].Tags?.includes(', ')) {
											results[i].Tags = (results[i].Tags as string).split(
												', ',
											);
										} else {
											results[i].Tags = [results[i].Tags as string];
										}
									}
								}

								return Response.json(results);
							}

							const { results } = await env.MOD_DB.prepare(
								"SELECT * FROM Mods WHERE UPPER(Name) = UPPER(?)"
							)
								.bind(name)
								.all();

							for (let i = 0; i < results.length; i++) {
								if (results[i].Versions.includes(', ')) {
									results[i].Versions = (
										results[i].Versions as string
									).split(', ');
								} else {
									results[i].Versions = [results[i].Versions as string];
								}
								if (results[i].Tags !== undefined) {
									if (results[i].Tags?.includes(', ')) {
										results[i].Tags = (results[i].Tags as string).split(
											', ',
										);
									} else {
										results[i].Tags = [results[i].Tags as string];
									}
								}
							}

							return Response.json(results);
						}
						default:
							return new Response('API route not found.');
					}
				}

				const object = await env.MOD_BUCKET.get(key);

				if (object === null) {
					return new Response('Object Not Found', { status: 404 });
				}

				const headers = new Headers();
				object.writeHttpMetadata(headers);
				headers.set('etag', object.httpEtag);

				return new Response(object.body, {
					headers,
				});
			}
			case 'DELETE':
				await env.MOD_BUCKET.delete(key);
				return new Response('Deleted!');

			default:
				return new Response('Method Not Allowed', {
					status: 405,
					headers: {
						Allow: 'PUT, GET, DELETE',
					},
				});
		}
	}
} satisfies ExportedHandler<Env>;