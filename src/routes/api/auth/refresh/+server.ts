import { REFRESH_TOKEN_SECRET } from "$env/static/private";
import { generateTokens } from "$lib/server/util/authUtil.js";
import { log } from "$lib/server/util/loggerUtil.js";
import User from "$lib/server/db/models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

function jwtErrorHandling(err: any) {
    switch(err.name) {
        case "NotBeforeError":
        case "TokenExpiredError": // Expired Token
            return new Response(JSON.stringify(err.message), {status: 401});
        case "JsonWebTokenError": // Unprocessable Refresh
            return new Response(JSON.stringify("Bad Refresh Token"), {status: 422});
    }
}

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ cookies }) => {

    // CHECK IF REFRESH EXISTS
    const refresh = cookies.get("session");
    if(!refresh) return new Response(JSON.stringify("No Required Cookie"), {status: 400});

    // IF REFRESH EXISTS, VERIFY
    const refresh_result = await jwt.verify(refresh, REFRESH_TOKEN_SECRET, async (err, user) => {
        // ERRORS?
        if(err) return jwtErrorHandling(err);

        // IF NO ERRORS, CHECK IF SESSION EXISTS
        // @TODO: MULTIPLE SESSIONS
        const username: string = (user as JwtPayload).username;
        const instance = await User.findOne({where: {username: username}});
        if(!instance || !await bcrypt.compare(refresh, instance.refresh_token)) {
            log(`auth`, `rejected refresh for user: ${username}`);
            return new Response(JSON.stringify("Unauthorized Refresh Token"), {status: 401});
        }

        // SIGN NEW TOKENS, ROTATE REFRESH TOKEN
        const tokens = generateTokens({username: username});
        instance.update({refresh_token: await bcrypt.hash(tokens.refresh_token, 10)});

        // UPDATE EXISTING COOKIE & RESPONSE
        cookies.set("session", tokens.refresh_token, {path: '/', httpOnly: true, sameSite: 'strict', secure: true});
        log(`auth`, `accepted refresh for user: ${username}`);
        return new Response(JSON.stringify({username: username, access_token: tokens.access_token}), {status: 200});
    })

    return refresh_result as any as Response;
}