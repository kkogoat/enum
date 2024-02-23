import sequelize from "$lib/server/db/db";
import { authenticateToken } from "./hooks/authHook";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

    if(event.url.pathname.startsWith('/api/media')) {
        const bearer = event.request.headers.get("authorization");
        if(!bearer) return new Response(JSON.stringify("Forbidden"), {status: 403});
        const result = (await authenticateToken(bearer)) as any;
        if(result.status == 200) {
            event.locals.username = result.username;
        } else {
            return new Response(JSON.stringify("Unauthorized"), {status: 401});
        }
    }

    const response = await resolve(event);
    return response;
}