import { writable, get } from "svelte/store";
import { customFetch } from "$lib/util/customFetchUtil";

function createAuthContext(user: string) {
    const { subscribe, set } = writable(user);
    let username: string = "";

    // LOGIN FUNCTION
    async function login(account: {username: string; password: string}) {
        const result = await customFetch.postNoAuth('/api/auth/login', account);
        
        // STATUS CODE HANDLER
        if(result.ok) {
            const acc = await result.json();
            set(acc.access_token);
            username = acc.username;
        }
        return result.status;
    }

    // SIGNUP FUNCTION
    async function signup(account: {username: string; password: string}) {
        const result = await customFetch.postNoAuth('/api/auth/signup', account);
        return result;
    }

    // LOGOUT
    async function logout() {
        let user = username;
        refreshLogout();
        const result = await customFetch.postNoAuth('/api/auth/logout', {username: user});
    }

    // CHANGE PASSWORD
    async function change(data: {current: string; newPass: string; confirm: string;}) {
        const result = await customFetch.put('/api/auth/change', data);
        return result;
    }


    // AUTO LOGIN ON PAGE REFRESH
    async function autoLogin() {
        const result = await customFetch.getNoAuth('/api/auth/refresh');

        // STATUS CODE HANDLER
        const response_body = await result.json();
        if(result.ok) { // ACCEPTED REFRESH
            set(response_body.access_token); // NEW ACCESS TOKEN
            username = response_body.username; // ASSOCIATED USERNAME W/TOKEN
        } else { // REJECTED REFRESH
            refreshLogout();
        }
    }

    // FETCH REFRESH RESULTS
    async function refreshLogout() { refresh("", "") }
    async function refresh(username: string, access_token: string) {
        set(access_token);
        username = username;
    }

    return { subscribe, login, signup, logout, autoLogin, change, refresh, refreshLogout }
}

export const authContext = createAuthContext("");