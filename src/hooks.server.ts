import sequelize from "$lib/server/db/db";
import { log } from "$lib/server/util/loggerUtil";
import { authenticateToken } from "./hooks/authHook";
import { validator } from "./hooks/validationHook";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

    // Protected Path
    if(event.url.pathname.startsWith('/api/media')) {
        const bearer = event.request.headers.get("authorization");
        if(!bearer) {
            log('auth', `Unauthorized ${event.url.pathname} request`);
            return new Response(JSON.stringify("Unauthorized"), {status: 401});
        }
        const result = (await authenticateToken(bearer)) as any;
        if(result.status == 200) {
            event.locals.username = result.username;
        } else {
            log('auth', `Forbidden ${event.url.pathname} request`);
            return new Response(JSON.stringify("Forbidden"), {status: 403});
        }
        log('auth', `Authorized ${event.url.pathname} request`);
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