import sequelize from "$lib/server/db/db";
import { log } from "$lib/server/util/loggerUtil";
import { authenticateToken } from "./hooks/authHook";
import { validator } from "./hooks/validationHook";

const protectedPath: {[key: string]: any}= {
    // AUTH
    '/api/auth/auto-login': 0,
    '/api/auth/login': 0,
    '/api/auth/logout': 0,
    '/api/auth/refresh': 0,
    '/api/auth/signup': 0,
    '/api/auth/change': 1, 
    
    // MEDIA
    '/api/media/add': 1,
    '/api/media/delete': 1,
    '/api/media/edit': 1,
    '/api/media/get-list': 1,
    '/api/media/import': 1,
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

    // Protected Path
    if(protectedPath[event.url.pathname]) {
        // CHECK IF ACCESS TOKEN EXISTS
        const bearer = event.request.headers.get("authorization");
        if(!bearer) return new Response(JSON.stringify("No Access Token Provided"), {status: 400});

        // IF ACCESS TOKEN EXISTS -> HANDLE
        const access_result = await authenticateToken(bearer) as any as Response;
        if(access_result.ok) {
            log('auth', `Authorized ${event.url.pathname} request`);
            event.locals.username = (await access_result.json()).username;
        } else if(access_result.status == 401) {
            log(`auth`, `Rejected ${event.url.pathname} request`);
            return new Response(JSON.stringify("Expired Token"),  {status: 401});
        } else {
            return new Response(JSON.stringify("Unprocessable Token"), {status: 422});
        }
    }

    // JOI Validation
    const validatorResult = await validator(event.url.pathname, event.request.clone());
    if(validatorResult) {
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