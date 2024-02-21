import { writable } from "svelte/store";

function createAuthContext(user: string) {
    const { subscribe, set } = writable(user);
    let username: string = "";

    async function login(account: {username: string; password: string}) {
        set(account.username);
        username = username;
    }

    async function autoLogin() {

    }

    async function logout() {
        set("");
    }

    return { subscribe, login, logout, autoLogin}
}

export const authContext = createAuthContext("");