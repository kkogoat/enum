import Media from "$lib/server/db/models/media";
import { log } from "$lib/server/util/loggerUtil";
import fs from "fs";

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
    if(!instance) {
        log("media", `Failed to delete, ${id} does not exist for ${username}`);
        return new Response(JSON.stringify("Record Does Not Exist"), {status: 404});
    }

    // DESTROYS SELECTED INSTANCE
    let image = instance.image;
    instance.destroy().then(() => {
        if(image) {
            fs.unlink(`static/covers/${instance.image}`, (err) => {
                if(err) console.log(err);
            });
        }
        log("media", `successfully deleted ${id} for ${username}`);
    });

    // RESPONSE
    return new Response(JSON.stringify("Successfully Deleted"), {status: 200});
}