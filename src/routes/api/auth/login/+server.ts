import User from '$lib/server/db/models/user.js';
import { generateTokens } from '$lib/server/util/authUtil.js';
import { log } from '$lib/server/util/loggerUtil.js';
import bcrypt from "bcrypt";

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, cookies }) => {
    const body = await request.json();

    // FIND USER & IF USER DNE || PASSWORD AUTHENTICATION
    const instance = await User.findOne({where: {username: body.username}});
    if(!instance || !await bcrypt.compare(body.password, instance.password)) {
        log(`auth`, `rejected login details for ${body.username}`);
        return new Response(JSON.stringify("Invalid username/password."), {status: 401});
    }

    // GENERATE TOKENS & SAVES REFRESH
    const tokens = generateTokens({username: instance.username});
    instance.update({refresh_token: await bcrypt.hash(tokens.refresh_token, 10)});

    // CREATE REFRESH_TOKEN COOKIE & LOGIN USER
    cookies.set("session", tokens.refresh_token, {path: '/', httpOnly: true, sameSite: 'strict', secure: true});
    log(`auth`, `logging in user: ${instance.username}`);

    // RESSPONSE
    return new Response(JSON.stringify({
        username: instance.username,
        access_token: tokens.access_token
    }), {status: 200});
}