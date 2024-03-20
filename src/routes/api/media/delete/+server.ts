import Media from "$lib/server/db/models/media";
import { log } from "$lib/server/util/loggerUtil";

/** @type {import('./types').RequestHandler} */
export const DELETE = async ({ request, locals }) => {
    let body = await request.json();
    let id = body.id;
    let username = locals.username;

    // CHECK IF INSTANCE EXISTS
    const instance = await Media.findOne({
        where: {
            id: id,
            username: username
        }
    })
    if(!instance) return new Response(JSON.stringify("Record Does Not Exist"), {status: 404});

    // DESTROYS INSTANCE
    instance.destroy();

    log("media", `successfully deleted ${id} for ${username}`);
    return new Response(JSON.stringify("Successfully Deleted"), {status: 200});
}