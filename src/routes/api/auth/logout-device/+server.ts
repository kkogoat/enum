import { REFRESH_TOKEN_SECRET } from '$env/static/private';
import Device from '$lib/server/db/models/device.js';
import { jwtErrorHandling } from '$lib/server/util/authUtil.js';
import { log } from '$lib/server/util/loggerUtil.js';
import  jwt from "jsonwebtoken";

/** @type {import('./$types').RequestHandler} */
export const POST = async({ request, locals, cookies }) => {
    let body = await request.json();
    let username: string = locals.username;
    let device_id: string = body.id;

    // CHECK IF LOGGING OUT YOUR CURRENT DEVICE
    const refresh = cookies.get("session");
    if(!refresh) return new Response(JSON.stringify("No Required Cookie"), {status: 400});
    const result = await jwt.verify(refresh, REFRESH_TOKEN_SECRET, async (err, payload) => {
        // ERRORS?
        if(err) return jwtErrorHandling(err);

        // TEST SAME DEVICE?
        if(device_id == (payload as JwtPayload).device_id) {
            return new Response(JSON.stringify("This is the same device you're currently using"), {status: 400});
        }

        return new Response(JSON.stringify("Ok to keep going"), {status: 200})
    })
    if(!((result as any as Response).status == 200)) {
        return result as any as Response;
    }

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