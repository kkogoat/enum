import { REFRESH_TOKEN_SECRET } from "$env/static/private";
import Media from "$lib/server/db/models/media";
import User from "$lib/server/db/models/user.js";
import { log } from "$lib/server/util/loggerUtil";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/** @type {import('./$types').RequestHandler} */
export const POST = async({ request, locals, cookies }) => {
    let body = await request.json();
    let username = locals.username;

    // COMPARE REFRESH TOKENS TO VERIFY IMPORT FROM LOGGED IN BROWSER
    const refresh = cookies.get("session");
    if(!refresh) return new Response(JSON.stringify("No Cookie"), {status: 400});
    const refresh_result = await jwt.verify(refresh, REFRESH_TOKEN_SECRET, async (err, _) => {
        if(err) return new Response(JSON.stringify(err.message), {status: 403});
        
        // USE USERNAME FROM ACCESS TOKEN, NOT REFRESH
        const instance = await User.findOne({where: {username: username}});
        if(!instance || !await bcrypt.compare(refresh, instance.refresh_token)) {
            return new Response(JSON.stringify("Bad Refresh"), {status: 403});
        }

        // IF BROWSER VERIFIED
        return new Response(JSON.stringify("Verified"), {status: 200});
    })
    if(!(refresh_result as any as Response).ok) {
        log("media", `bad refresh for import for ${username}`);
        return new Response(JSON.stringify("Forbidden"), {status: 403});
    }

    // ADD USERNAME/REMOVE IDS, THEN PERFORM SAFE DELETE
    body = body.map(({id, ...attr} : {id: string}) => ({...attr, username: username}))
    let previous = await Media.findAll({where: {username: username}, raw: true});
    let previous_reconstructed = previous.map(({id, ...attr} : {id: string}) => ({...attr}));
    await Media.destroy({where: {username: username}});

    // IMPORT MEDIA
    let result: any;
    try{
        result = await Media.bulkCreate(body, { validate: true, individualHooks: true }).then((res) => {
            log("media", `successfully imported list for ${username}`);
            return new Response(JSON.stringify({message: `Successfully Imported for ${username}`}), {status: 200});
    
        }).catch(async (error) => {
            log("media", `unsuccessfully import list for ${username}, reverting back...`);
            await Media.bulkCreate(previous_reconstructed as any);
            return new Response(JSON.stringify({message: `Incorrect file content, Reverting...`}), {status: 400});
        });
    } catch (error) {
        return new Response(JSON.stringify({message: `Incorrect file content, Reverting...`}), {status: 400});
    }    

    // RESPONSE
    return result;
}