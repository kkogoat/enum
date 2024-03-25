import { writable } from "svelte/store";

function createAuthContext(user: string) {
    const { subscribe, set } = writable(user);
    let username: string = "";

    // LOGIN FUNCTION
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
        return result.status;
    }

    // AUTO LOGIN
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

    // LOGOUT
    async function logout() {
        let user = username;
        set("");
        username = "";
        const result = await fetch('/api/auth/logout', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify({username: user})
        })
    }

    // REFRESH
    async function refresh(username: string, access_token: string) {
        set(access_token);
        username = username;
    }
    
    // IF REFRESH FAILS -> LOGOUT
    async function refreshLogout() {
        set("");
        username = "";
    }

    return { subscribe, login, logout, autoLogin, refresh, refreshLogout }
}

export const authContext = createAuthContext("");