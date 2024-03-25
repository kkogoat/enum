import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '$env/static/private';
import User from '$lib/server/db/models/user.js';
import { log } from '$lib/server/util/loggerUtil.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ cookies }) => {
    
    // CHECK IF COOKIE EXISTS
    const refresh = cookies.get("session");
    if(!refresh) return new Response(JSON.stringify("No Cookie"), {status: 400});

    // VERIFY REFRESH
    const result = await jwt.verify(refresh, REFRESH_TOKEN_SECRET, async (err, user) => {
        // IF EXPIRED -> FORBIDDEN
        if(err) return new Response(JSON.stringify(err.message), {status: 403});

        // COMPARE STORED REFRESH_TOKEN & COOKIE
        const username: string = (user as JwtPayload).username;
        const instance = await User.findOne({where: {username: username}});
        if(!instance || !await bcrypt.compare(refresh, instance.refresh_token)) {
            log("auth", `bad refresh for ${username}`);
            return new Response(JSON.stringify("Bad Refresh"), {status: 403});
        }
        
        // SIGN NEW ACCESS_TOKEN
        log("auth", `refresh user: ${instance.username}`);
        const access_token = jwt.sign({username: username}, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
        return new Response(JSON.stringify({username: username, access_token: access_token}), {status: 200});
    })

    return result as unknown as Response;
}