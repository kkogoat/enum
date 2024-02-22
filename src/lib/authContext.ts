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
        set(decoded.access_token);
        username = decoded.username;
    }

    async function autoLogin() {
        const result = await fetch('/api/auth/auto-login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin"
        })
        const decoded = await result.json();
        set(decoded.access_token);
        username = decoded.username;
    }

    async function logout() {
        const result = await fetch('/api/auth/logout', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify({username: username})
        })

        if (result.ok) {
            set("");
            username = "";
        }
    }

    return { subscribe, login, logout, autoLogin}
}

export const authContext = createAuthContext("");