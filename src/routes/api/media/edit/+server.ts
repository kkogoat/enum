import Media from "$lib/server/db/models/media";
import { log } from "$lib/server/util/loggerUtil";
import { writeFileSync, unlink } from "fs";
import { extname } from 'path';

/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, locals }) => {
    // FORM DATA -> JSON OBJECT
    const form = await request.formData();
    let body: any = {};
    for (const pair of form.entries()) {
        body[pair[0]] = pair[1];
    }
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
    const image = form.get("image") as File;
    let image_name = undefined;
    if(image) {
        image_name = `${crypto.randomUUID()}${extname(image.name)}`;
        writeFileSync(`static/covers/${image_name}`, Buffer.from(await image.arrayBuffer()));
        body["image"] = image_name;
    }
    delete(body["id"]);
    let old_image = check.image;
    Media.update(
        body,
        { where: {id: id, username: username} },
    ).then(() => { // IF SUCCESSFUL UPDATE, DELETE OLD IMAGE IF NEW IMAGE WAS CREATED
        if(image_name && old_image) {
            unlink(`static/covers/${old_image}`, (err) => {
                if(err) console.log(err);
            })
        }
    }).catch(() => {
        if(image_name) { // IF FAILED UPDATE, DELETE NEW IMAGE IF IT WAS CREATED
            unlink(`static/covers/${image_name}`, (err) => {
                if(err) console.log(err);
            })
        }
    })
    log("media", `successfully edited ${body.title} for ${body.username}`);

    // RESPONSE
    return new Response(JSON.stringify({message: "Successfully Edited", image: image_name}), {status: 200});
}