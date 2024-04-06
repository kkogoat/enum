import { APP_DEFAULT_MAX_ENTRIES, APP_DEFAULT_MAX_ENTRY_LIMIT } from '$env/static/private';
import Media from '$lib/server/db/models/media.js';
import { log } from '$lib/server/util/loggerUtil.js';
import { writeFileSync } from 'fs';
import crypto from "crypto";

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals }) => {
    // FORM DATA -> JSON OBJECT
    const form = await request.formData();
    let body: any = {};
    for (const pair of form.entries()) {
        body[pair[0]] = pair[1];
    }
    body["username"] = locals.username;

    // MAX ENTRIES
    if(APP_DEFAULT_MAX_ENTRY_LIMIT == "true") {
        let maxEntries = parseInt(APP_DEFAULT_MAX_ENTRIES);
        const num = (await Media.findAll({where: {username: body.username}, raw: true})).length;
        if(num >= maxEntries) return new Response(JSON.stringify("Max Entries Reached"), {status: 405});
    }

    // CHECK IF DUPLICATE EXISTS
    const check = await Media.findOne({
        where: {
            title: body.title,
            type: body.type,
            username: body.username
        }
    })
    if(check) {
        log("media", `Duplicate record ${body.title} exists for ${body.username}`);
        return new Response(JSON.stringify("Duplicate Record Exists"), {status: 409});
    }

    // UPLOAD IMAGE, THEN ADD NEW MEDIA TO MODEL
    const image = form.get("image") as File;
    let image_name = undefined;
    if(image) {
        image_name = `${crypto.randomUUID()}.${image.name.split('.').pop()}`;
        writeFileSync(`static/${image_name}`, Buffer.from(await image.arrayBuffer()));
        body["image"] = image_name;
    }
    const instance = await Media.create(body);
    log("media", `successfully added ${body.title} to ${body.username}`);

    // RESPONSE
    return new Response(JSON.stringify({message: "Successfully Added", instance}), {status: 200});
}
