// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			username: string;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface JwtPayload {
        username: string;
		device_id: string;
		exp: number;
    }
}

export {};
