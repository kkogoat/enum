import User from '$lib/server/db/models/user.js';
import Device from '$lib/server/db/models/device.js';
import { generateTokens } from '$lib/server/util/authUtil.js';
import { log } from '$lib/server/util/loggerUtil.js';
import bcrypt from "bcrypt";
import UAParser from 'ua-parser-js';


/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, cookies }) => {
    const body = await request.json();

    // FIND USER & IF USER DNE || PASSWORD AUTHENTICATION
    const instance = await User.findOne({where: {username: body.username}});
    if(!instance || !await bcrypt.compare(body.password, instance.password)) {
        log(`auth`, `rejected login details for ${body.username}`);
        return new Response(JSON.stringify("Invalid username/password."), {status: 401});
    }

    // BUILD DEVICE TABLE ENTRY
    let parser = new UAParser(request.headers.get('user-agent') as string)
    let device_string = `${parser.getOS().name} ${parser.getOS().version}:${parser.getBrowser().name}/${parser.getBrowser().version}`;
    const device = Device.build({ username: body.username, device: device_string });
    const tokens = generateTokens({username: instance.username, device_id: device.id});
    device.token = await bcrypt.hash(tokens.refresh_token, 10);
    await device.save();

    // CREATE REFRESH_TOKEN COOKIE & LOGIN USER

    cookies.set("session", tokens.refresh_token, {path: '/', httpOnly: true, sameSite: 'strict', secure: true, maxAge: 31536000});
    log(`auth`, `logging in user: ${instance.username}`);

    // RESSPONSE
    return new Response(JSON.stringify({
        username: instance.username,
        access_token: tokens.access_token
    }), {status: 200});
}