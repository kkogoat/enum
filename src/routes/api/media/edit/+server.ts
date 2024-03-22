import Media from "$lib/server/db/models/media";
import { log } from "$lib/server/util/loggerUtil";

/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, locals }) => {
    let body = await request.json();
    let id = body.id;
    let username = locals.username;

    // CHECK IF INSTANCE EXISTS
    const check = await Media.findOne({
        where: {
            id: id,
            username: username
        }
    })
    if(!check) return new Response(JSON.stringify("Record Does Not Exist"), {status: 404});

    // EDIT MEDIA
    delete(body["id"]);
    Media.update(
        body,
        { where: {id: id, username: username}}
    )
        
    log("media", `successfully edited ${body.title} for ${body.username}`);
    return new Response(JSON.stringify("Successfully Edited"), {status: 200});
}