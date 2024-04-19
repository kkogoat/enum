import { env as envPublic } from "$env/dynamic/public"; 
import Media from '$lib/server/db/models/media.js';
import { log } from '$lib/server/util/loggerUtil.js';
import { writeFileSync } from 'fs';
import crypto from "crypto";
import { extname } from 'path';

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
    if(envPublic.PUBLIC_DEMO === "true") {
        let maxEntries = parseInt(envPublic.PUBLIC_DEMO_MAX_ENTRIES);
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
    let image_name = null;
    if(envPublic.PUBLIC_DEMO !== "true") {
        const image = form.get("image") as File;
        if(image) {
            image_name = `${crypto.randomUUID()}${extname(image.name)}`;
            writeFileSync(`covers/${image_name}`, Buffer.from(await image.arrayBuffer()));
        }
    }
    body["image"] = image_name;
    const instance = await Media.create(body);
    log("media", `successfully added ${body.title} to ${body.username}`);

    // RESPONSE
    return new Response(JSON.stringify({message: "Successfully Added", instance}), {status: 200});
}
