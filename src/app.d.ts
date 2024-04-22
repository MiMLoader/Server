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
	author: string;
	name: string;
	description: string;
	versions: (string)[];
	tags?: (string)[] | null;
}
