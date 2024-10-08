import { generateTokens, jwt_error_handling } from "$lib/server/util/authUtil.js";
import { env } from "$env/dynamic/private"; 
import { log } from "$lib/server/util/loggerUtil.js";
import Device from "$lib/server/db/models/device.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ cookies }) => {

    // CHECK IF REFRESH EXISTS
    const refresh = cookies.get("session");
    if(!refresh) return new Response(JSON.stringify("No Required Cookie"), {status: 400});

    // IF REFRESH EXISTS, VERIFY
    const refresh_result = await jwt.verify(refresh, env.REFRESH_TOKEN_SECRET, async (err, user) => {
        // ERRORS?
        if(err) {
            if(err.name == "TokenExpiredError") {
                const payload = await jwt.verify(refresh, env.REFRESH_TOKEN_SECRET, {ignoreExpiration: true});
                await Device.destroy({where: {id: (payload as JwtPayload).device_id}});
                cookies.delete("session", {path: '/', httpOnly: true, sameSite: 'strict', secure: true});
            }
            return jwt_error_handling(err);
        }

        // IF NO ERRORS, CHECK IF SESSION EXISTS
        const username: string = (user as JwtPayload).username;
        const device_id: string = (user as JwtPayload).device_id;
        const device = await Device.findOne({where: {id: device_id, username: username}});
        if(!device || !await bcrypt.compare(refresh, device.token)) {
            log(`auth`, `rejected refresh for user: ${username}`);
            if(device) { // GIVEN TWO VALID MISMATCHED TOKEN -> ONE IS COMPROMISED, LOGOUT
                device.destroy();
                cookies.delete("session", {path: '/', httpOnly: true, sameSite: 'strict', secure: true});
            }
            return new Response(JSON.stringify("Unauthorized Refresh Token"), {status: 401});
        }

        // SIGN NEW TOKENS, ROTATE REFRESH TOKEN
        const tokens = generateTokens({username: username, device_id: device_id});
        device.update({token: await bcrypt.hash(tokens.refresh_token, 10)});

        // UPDATE EXISTING COOKIE & RESPONSE
        cookies.set("session", tokens.refresh_token, {path: '/', httpOnly: true, sameSite: 'strict', secure: true, maxAge: 31536000});
        log(`auth`, `accepted refresh for user: ${username}`);
        return new Response(JSON.stringify({username: username, access_token: tokens.access_token}), {status: 200});
    })

    return refresh_result as any as Response;
}