import { env as envPublic } from "$env/dynamic/public"; 
import Device from '$lib/server/db/models/device.js'
import { log } from '$lib/server/util/loggerUtil.js';

/** @type {import('./$types').RequestHandler} */
export const GET = async({ locals }) => {

    // GET CURRENT CONNECTED DEVICES
    let list = await Device.findAll({
        order: [['updated_at', 'DESC']],
        where: {
            username: locals.username
        },
        attributes: ['id', 'device', 'updated_at']
    });
    log(`auth`, `successfully get device list for ${locals.username}`);

    if(envPublic.PUBLIC_DEMO === "true") {
        list = []
    }
    
    // RESPONSE
    return new Response(JSON.stringify(list), {status: 200});
}