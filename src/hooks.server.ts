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
                log('auth', `Rejected ${event.url.pathname} request`);
                return auth_token_response;
            case 200: // Authorized Request
                event.locals.username = await auth_token_response.text();
                log('auth', `Authorized ${event.url.pathname} request`);
                break;
            default:
                break;
        }
    }

    // JOI BODY VALIDATION
    const joi_validation_response: Response | null = await validator(event.url.pathname, event.request.clone());
    if(joi_validation_response) {
        switch(joi_validation_response.status) {
            case 400: // Bad Validation
                log('joi', `Rejected ${event.url.pathname} request`);
                return new Response(JSON.stringify({details: [{message: await joi_validation_response.text()}]}), {status: 400});
            case 422: // Unprocessable Data
                return new Response(JSON.stringify({details: [{message: await joi_validation_response.text()}]}), {status: 302, headers: { Location: '/' }});
            case 200: // Validated Request
                log('joi', `Validated ${event.url.pathname} request`);
                break;
            default:
                break;
        }
    }

    // SITE THEME
    const theme = event.cookies.get("theme");

    // Request Processing
    const response = await resolve(event, {
        transformPageChunk: ({html}) => html.replace('data-theme=""', `data-theme="${theme}"`)
    });
    return response;
}