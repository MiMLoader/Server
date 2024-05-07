export interface Env {
	MOD_DB: D1Database;
	MOD_BUCKET: R2Bucket;
	AUTH_KEY_SECRET: string;
}
export interface Mod {
	name: string;
	author: string;
	description: string;
	versions: string[];
	tags?: string[] | null;
	version?: string;
}

const hasValidHeader = (request, env) => {
	return request.headers.get('Authorization') === `Bearer ${env.AUTH_KEY_SECRET}`;
};

const createHeaders = (request, ...additionalHeaders) => {
	return {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET",
		"Access-Control-Max-Age": "86400",
		"Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers"),
		...additionalHeaders
	};
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
			return new Response('Forbidden', { status: 403, headers: createHeaders(request) });
		}

		switch (request.method) {
			case 'PUT':
				if (url.pathname.startsWith('/db')) {
					const modJson: Mod = await request.json();

					const { results } = await env.MOD_DB.prepare(
						"SELECT * FROM Mods WHERE UPPER(Author) = UPPER(?) AND UPPER(Name) = UPPER(?)"
					)
						.bind(modJson.author, modJson.name)
						.all();

					if (results.length === 0) {
						const info = await env.MOD_DB.prepare(
							"INSERT INTO Mods (name, author, description, versions, tags) VALUES (?, ?, ?, ?, ?)"
						)
							.bind(modJson.name, modJson.author, modJson.description, modJson.version, modJson.tags.join(', '))
							.run();
						if (info.error) {
							return new Response(info.error);
						}
					} else {
						const versionsString = [results[0].Versions, modJson.version].join(', ');
						const info = await env.MOD_DB.prepare(
							"UPDATE Mods SET versions = ? WHERE UPPER(Author) = UPPER(?) AND UPPER(Name) = UPPER(?)"
						)
							.bind(versionsString, modJson.author, modJson.name)
							.run();
						if (info.error) {
							return new Response(info.error);
						}
					}

					return new Response('200');
				}
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

							const response = new Response(JSON.stringify(results), { headers: createHeaders(request) });

							return response;
						}
						case 'mods': {
							const author = urlArray.slice(3, 4)[0];
							const name = urlArray.slice(4, 5)[0];

							if (!name) {
								const { results } = await env.MOD_DB.prepare(
									"SELECT * FROM Mods WHERE UPPER(Author) = UPPER(?)"
								)
									.bind(author)
									.all();

								for (let i = 0; i < results.length; i++) {
									if (results[i].versions.includes(', ')) {
										results[i].versions = (
											results[i].versions as string
										).split(', ');
									} else {
										results[i].versions = [results[i].versions as string];
									}
									if (results[i].tags !== undefined) {
										if (results[i].tags?.includes(', ')) {
											results[i].tags = (results[i].tags as string).split(
												', ',
											);
										} else {
											results[i].tags = [results[i].tags as string];
										}
									}
								}

								return Response.json(results, { headers: createHeaders(request) });
							}

							const { results } = await env.MOD_DB.prepare(
								"SELECT * FROM Mods WHERE UPPER(Name) = UPPER(?)"
							)
								.bind(name)
								.all();

							for (let i = 0; i < results.length; i++) {
								if (results[i].versions.includes(', ')) {
									results[i].versions = (
										results[i].versions as string
									).split(', ');
								} else {
									results[i].versions = [results[i].versions as string];
								}
								if (results[i].tags !== undefined) {
									if (results[i].tags?.includes(', ')) {
										results[i].tags = (results[i].tags as string).split(
											', ',
										);
									} else {
										results[i].tags = [results[i].tags as string];
									}
								}
							}

							return Response.json(results, { headers: createHeaders(request) });
						}
						default:
							return new Response('API route not found.');
					}
				}

				const object = await env.MOD_BUCKET.get(key);

				if (object === null) {
					return new Response('Object Not Found', { status: 404 });
				}

				const headers = createHeaders(request, `etag: ${object.etag}`);

				return new Response(object.body, {
					headers,
				});
			}
			case 'DELETE':
				await env.MOD_BUCKET.delete(key);
				return new Response('Deleted!', { headers: createHeaders(request) });

			default:
				return new Response('Method Not Allowed', {
					status: 405,
					headers: createHeaders(request, 'Allow: PUT, GET, DELETE'),
				});
		}
	}
} satisfies ExportedHandler<Env>;