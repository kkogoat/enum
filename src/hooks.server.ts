import sequelize from "$lib/server/db/db";
import { log } from "$lib/server/util/loggerUtil";
import { authorize } from "./hooks/authHook";
import { validator } from "./hooks/validationHook";

/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({ error, event, status, message }) {
    switch(status) {
        case 404: 
            return {message, errorId: status};
    }
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

    // AUTH TOKEN VALIDATION
    const auth_token_response: Response | null = authorize(event.url.pathname, event.request.clone());
    if(auth_token_response) {
        switch(auth_token_response.status) {
            case 302: // No Token Redirect
            case 401: // Unauthorized Request
            case 422: // Unprocessable Token
            case 500: // Internal Server Error
                return auth_token_response;
            case 200: // Authorized Request
                event.locals.username = await auth_token_response.text();
                break;
            default:
                break;
        }
    }

    // JOI Validation
    const validatorResult = await validator(event.url.pathname, event.request.clone());
    if(validatorResult) {
        if(validatorResult.status) {
            return new Response(JSON.stringify(validatorResult), {status: 302, headers: { Location: '/' }});
        }
        return new Response(JSON.stringify(validatorResult), {status: 400});
    }

    // SITE THEME
    const theme = event.cookies.get("theme");

    // Request Processing
    const response = await resolve(event, {
        transformPageChunk: ({html}) => html.replace('data-theme=""', `data-theme="${theme}"`)
    });
    return response;
}