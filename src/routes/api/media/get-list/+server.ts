import Media from '$lib/server/db/models/media.js';
import { log } from '$lib/server/util/loggerUtil.js';

/** @type {import('./$types').RequestHandler} */
export const GET = async({ locals }) => {

    let list = await Media.findAll({
        order:[['title', 'ASC']],
        where: {
            username: locals.username
        },
        attributes: { exclude: ['username', 'updated_at']}
    });
    return new Response(JSON.stringify(list), {status: 200});
}