import { authContext } from "$lib/context/authContext"
import { get } from "svelte/store"

// RETRY LIMIT
let RETRY_LIMIT = 5;

// RETRY REQUEST HANDLER
const retryFetch: any = async (func: any, api: string, data: object, NUM_RETRIES: number = RETRY_LIMIT) => {
    if(NUM_RETRIES == 0) {
        return null;
    };

    // REFRESH WITH LIMITED RETRIES
    const result = await fetch('/api/auth/refresh', {
        method: "GET",
        credentials: "same-origin"
    }).catch(async (error) => {
        return await retryFetch(func, api, data, NUM_RETRIES-1);
    });

    // REFRESH CASES
    if(result == null) {
        return {error: "RETRY LIMIT REACHED", result: null};
    } else if(result.ok) { // GOOD REFRESH? FIRE ORIGINAL REQUEST
        const credentials = await result.json();
        authContext.refresh(credentials.usesrname, credentials.access_token);
        return {error: null, result: await func(api, data)};
    } else {
        return {error: await result.json(), result: null};
    }
}

// GET
const GET = (api: string, data: object = {}) => {
    return fetch(api, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${get(authContext)}`
        },
    }).then(async (res) => {
        if(res.status == 401) {
            const {error, result} = await retryFetch(GET, api, data);
            if(result) return result;
            if(error) authContext.refreshLogout();
        }
        return res;
    }).catch((error) => {
        console.log(error);
    });
}

// POST
const POST = (api: string, data: object) => {
    return fetch(api, {
        method: "POST",
        headers: {
            "Content--Type": "application/json",
            "Authorization": `Bearer ${get(authContext)}`
        },
        body: JSON.stringify(data)
    }).then(async (res) => {
        if(res.status == 401) {
            const {error, result} = await retryFetch(POST, api, data);
            if(result) return result;
            if(error) authContext.refreshLogout();
        }
        return res;
    }).catch((error) => {
        console.log(error);
    });
}

// PUT
const PUT = (api: string, data: object) => {
    return fetch(api, {
        method: "PUT",
        headers: {
            "Content--Type": "application/json",
            "Authorization": `Bearer ${get(authContext)}`
        },
        body: JSON.stringify(data)
    }).then(async (res) => {
        if(res.status == 401) {
            const {error, result} = await retryFetch(PUT, api, data);
            if(result) return result;
            if(error) authContext.refreshLogout();
        }
        return res;
    }).catch((error) => {
        console.log(error);
    });
}

// DELETE
const DELETE = (api: string, data: object) => {
    return fetch(api, {
        method: "DELETE",
        headers: {
            "Content--Type": "application/json",
            "Authorization": `Bearer ${get(authContext)}`
        },
        body: JSON.stringify(data)
    }).then(async (res) => {
        if(res.status == 401) {
            const {error, result} = await retryFetch(DELETE, api, data);
            if(result) return result;
            if(error) authContext.refreshLogout();
        }
        return res;
    }).catch((error) => {
        console.log(error);
    });
}

// FETCHES WITHOUT AUTHORIZATION
const GET_NO_AUTH = async (api: string) => {
    return await fetch(api, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin"
    });
}

const POST_NO_AUTH = async (api: string, data: object) => {
    return await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(data)
    })
}

export const customFetch = {
    retryFetch: retryFetch,
    get: GET,
    post: POST,
    put: PUT,
    delete: DELETE,
    getNoAuth: GET_NO_AUTH,
    postNoAuth: POST_NO_AUTH
}