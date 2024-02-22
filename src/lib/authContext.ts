import { writable } from "svelte/store";

function createAuthContext(user: string) {
    const { subscribe, set } = writable(user);
    let username: string = "";

    async function login(account: {username: string; password: string}) {
        const result = await fetch('/api/auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify(account)
        })
        const decoded = await result.json();
        console.log(decoded);

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