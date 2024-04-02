import Device from '$lib/server/db/models/device.js';
import { log } from '$lib/server/util/loggerUtil.js';

/** @type {import('./$types').RequestHandler} */
export const POST = async({ request, locals }) => {
    let body = await request.json();
    let username: string = locals.username;
    let device_id: string = body.id;

    // GET DEVICE & TEST
    let device = await Device.findOne({where: {id: device_id, username: username}});
    if(!device) { // DEVICE DNE
        log(`auth`, `invalid device for logout: ${username}`);
        return new Response(JSON.stringify(`Invalid device for ${username}`), {status: 400});
    }
    await device.destroy().catch(() => { // DESTROY FAILURE
        log(`auth`, `unsuccessful logout for device ${device_id} for ${username}`)
        return new Response(JSON.stringify(`Unsuccessful logout for a device for ${username}`), {status: 500});
    });

    log(`auth`, `successfully logged out of device ${device_id} for ${username}`);
    return new Response(JSON.stringify(`Successfully logged out of a device for ${username}`), {status: 200});
}