import Media from '$lib/server/db/models/media.js';
import { log } from '$lib/server/util/loggerUtil.js';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals }) => {
    let body = await request.json();
    body.username = locals.username;

    // CHECK IF DUPLICATE EXISTS
    const check = await Media.findOne({
        where: {
            title: body.title,
            username: body.username
        }
    })
    if(check) return new Response(JSON.stringify("Duplicate Record Exists"), {status: 409});

    // ADD MEDIA TO MODEL
    const instance = await Media.create(body);
    log("media", `successfully added ${body.title} to ${body.username}`);
    return new Response(JSON.stringify("Successfully Added"), {status: 200});
}
