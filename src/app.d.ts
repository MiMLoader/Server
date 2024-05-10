// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export interface Mod {
	name: string;
	author: string;
	description: string;
	versions: string[] | string;
	tags?: string[] | null;
}
