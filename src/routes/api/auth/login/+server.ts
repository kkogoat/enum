import User from '$lib/server/db/models/user.js';
import { generateTokens } from '$lib/server/util/authUtil.js';
import bcrypt from "bcrypt";

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, cookies }) => {
    const body = await request.json();

    // FIND USER
    const instance = await User.findOne({where: {username: body.username.toLowerCase()}});

    // IF USER DNE || PASSWORD AUTHENTICATION
    if(!instance || !await bcrypt.compare(body.password, instance.password)) {
        return new Response(JSON.stringify("Invalid username/password."), {status: 401});
    }

    // GENERATE TOKENS
    const tokens = generateTokens({username: instance.username});

    // SAVE REFRESH TOKEN
    instance.update({refresh_token: await bcrypt.hash(tokens.refresh_token, 10)});
    instance.save();

    // CREATE REFRESH_TOKEN COOKIE
    cookies.set("session", tokens.refresh_token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
    })

    return new Response(JSON.stringify({
        username: instance.username,
        access_token: tokens.access_token
    }), {status: 200});
}