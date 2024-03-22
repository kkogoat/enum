import { authContext } from "$lib/context/authContext"
import { get } from "svelte/store"

// RETRY LIMIT
let RETRY_LIMIT = 5;

// RETRY REQUEST HANDLER
const retryFetch: any = async (func: any, api: string, data: object, NUM_RETRIES: number = RETRY_LIMIT) => {
    if(NUM_RETRIES == 0) {
        return null;
    };

    // REFRESH RETRY
    const result = await fetch('/api/auth/refresh', {
        method: "GET",
        credentials: "same-origin"
    }).catch((error) => {
        return retryFetch(func, api, data, NUM_RETRIES-1);
    });

    // IF SUCCESSFUL REFRESH, FIRE INTENDED FETCH
    if(result && result.ok) {
        const res = await (result as Response).json();
        authContext.refresh(res.username, res.access_token);
        return func(api, data);
    } else {
        return retryFetch(func, api, data, NUM_RETRIES-1);
    }
}

// GET
const GET = (api: string, data: object = {}) => {
    return fetch(api, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${get(authContext)}`
        },
    }).then((res) => {
        if(res.status == 401) {
            const retryResult = retryFetch(GET, api, {});
            if(!retryResult) {
                authContext.logout();
            }
            return retryResult;
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
    }).then((res) => {
        if(res.status == 401) {
            const retryResult = retryFetch(POST, api, data);
            if(!retryResult) {
                authContext.logout();
            }
            return retryResult;
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
    }).then((res) => {
        if(res.status == 401) {
            const retryResult = retryFetch(PUT, api, data);
            if(!retryResult) {
                authContext.logout();
            }
            return retryResult;
        }
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
    }).then((res) => {
        if(res.status == 401) {
            const retryResult = retryFetch(DELETE, api, data);
            if(!retryResult) {
                authContext.logout();
            }
            return retryResult;
        }
    }).catch((error) => {
        console.log(error);
    });
}

export const customFetch = {
    retryFetch: retryFetch,
    get: GET,
    post: POST,
    put: PUT,
    delete: DELETE,
}