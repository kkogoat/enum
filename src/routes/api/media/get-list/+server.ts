import Media from '$lib/server/db/models/media.js';
import { log } from '$lib/server/util/loggerUtil.js';

/** @type {import('./$types').RequestHandler} */
export const GET = async({ locals }) => {

    // GET USER'S LIST
    let list = await Media.findAll({
        order:[['title', 'ASC']],
        where: {
            username: locals.username
        },
        attributes: { exclude: ['username', 'updated_at']}
    });
    log('media', `successfully got media list for ${locals.username}`)

    // RESPONSE
    return new Response(JSON.stringify(list), {status: 200});
}