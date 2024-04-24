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
	Name: string;
	Author: string;
	Description: string;
	Versions: string[] | string;
	Tags?: string[] | string | null;
}
