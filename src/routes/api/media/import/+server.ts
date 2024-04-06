import Media from "$lib/server/db/models/media";
import { log } from "$lib/server/util/loggerUtil";
import fs from "fs";

/** @type {import('./$types').RequestHandler} */
export const POST = async({ request, locals }) => {
    let body = await request.json();
    const username = locals.username;

    // ADD USERNAME, REMOVE IDS & PICTURES, THEN PERFORM SAFE DELETE
    body = body.map(({id, image, ...attr} : {id: string, image: string}) => ({...attr, username: username}))
    let previous = await Media.findAll({where: {username: username}, raw: true});
    await Media.destroy({where: {username: username}});

    // TRY IMPORT MEDIA
    let result: any;
    try {
        result = await Media.bulkCreate(body, { validate: true, individualHooks: true }).then((res) => {
            for (const {image} of previous) {
                fs.unlink(`static/covers/${image}`, (err) => {
                    if(err) console.log(err);
                });
            }
            log("media", `successfully imported list for ${username}`);
            return new Response(JSON.stringify({message: `Successfully Imported for ${username}`}), {status: 200});
        }).catch(async (error) => {
            let previous_reconstructed = previous.map(({id, ...attr} : {id: string}) => ({...attr}));
            await Media.bulkCreate(previous_reconstructed as any);
            log("media", `unsuccessfully import list for ${username}, reverting back...`);
            return new Response(JSON.stringify({message: `Incorrect file content, Reverting...`}), {status: 400});
        });
    } catch(error) {
        return new Response(JSON.stringify({message: `Incorrect file content...`}), {status: 400});
    }

    // RESPONSE
    return result;
}