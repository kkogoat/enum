import { REFRESH_TOKEN_SECRET } from '$env/static/private';
import User from '$lib/server/db/models/user.js';
import { log } from '$lib/server/util/loggerUtil.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, cookies }) => {
    const body = await request.json();

    // CHECK IF COOKIE EXISTS
    const refresh = cookies.get("session");
    if(!refresh) return new Response(JSON.stringify("Already Logged Out"), {status: 400});

    // VERIFY REFRESH
    const result = await jwt.verify(refresh, REFRESH_TOKEN_SECRET, async (err, user) => {
        // COMPARE STORED REFRESH_TOKEN & COOKIE
        const username: string = (user as JwtPayload).username;
        const instance = await User.findOne({where: {username: username}});
        if(!instance || !await bcrypt.compare(refresh, instance.refresh_token)) {
            log("auth", `mismatched refresh for ${username}`);
            return new Response(JSON.stringify("Mismatched Refresh"), {status: 400});
        }
        return new Response(JSON.stringify(""), {status: 200});
    });

    // IF TOKENS DO NOT MATCH GIVEN USERNAME
    if(!(result as unknown as Response).ok) return new Response(JSON.stringify("Unsuccessful Logout"), {status: 400});

    // CLEAR REFRESH TOKEN
    await User.update({refresh_token: ""}, {where: {username: body.username}});
    cookies.delete("session", {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
    });
    log("auth", `logging out user: ${body.username}`);

    return new Response(JSON.stringify("Successfully Logged Out"), {status: 200});
}