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
        },
        raw: true
    })
    if(!check) {
        log("media", `Failed to edit, ${body.title} does not exist for ${username}`)
        return new Response(JSON.stringify({details:[{ message:"Record Does Not Exist" }]}), {status: 404});
    }

    // CHECK IF DUPLICATE EXISTS
    const dupe = await Media.findOne({
        where: {
            title: body.title,
            type: body.type,
            username: username
        },
        raw: true
    })
    if(dupe && (dupe.title != check.title) && (dupe.type != check.type)) {
        log("media", `Failed to edit, ${body.title}:${body.type} already exists for ${username}`)
        return new Response(JSON.stringify({details:[{ message:"Duplicate Record Exists" }]}), {status: 400});
    }

    // EDIT SELECTED MEDIA
    delete(body["id"]);
    Media.update(
        body,
        { where: {id: id, username: username}}
    )
    log("media", `successfully edited ${body.title} for ${body.username}`);

    // RESPONSE
    return new Response(JSON.stringify("Successfully Edited"), {status: 200});
}