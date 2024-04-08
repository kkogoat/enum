import { REFRESH_TOKEN_SECRET } from '$env/static/private';
import Device from '$lib/server/db/models/device.js';
import { log } from '$lib/server/util/loggerUtil.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ locals, cookies }) => {
    const username = locals.username;

    // CHECK IF COOKIE EXISTS
    const refresh = cookies.get("session");
    if(!refresh) return new Response(JSON.stringify("Already Logged Out"), {status: 400});

    // VERIFY REFRESH
    const result = await jwt.verify(refresh, REFRESH_TOKEN_SECRET, async (err, user) => {
        const name: string = (user as JwtPayload).username == username ? username : "";
        const device_id: string = (user as JwtPayload).device_id;

        // IF AUTH BEARER NAME & REFRESH TOKEN NAME DO NOT EQUAL, GIVE UP REQUEST
        if(name == "") {
            return new Response(JSON.stringify("Mismatched Logout Details"), {status: 403});
        }

        // GET DEVICE & COMPARE STORED TOKEN & GIVEN REFRESH
        const device = await Device.findOne({where: {id: device_id, username: username}});
        if(!device || !await bcrypt.compare(refresh, device.token)) {
            log("auth", `mismatched refresh for ${username}`);
            return new Response(JSON.stringify("Unsuccessful Logout"), {status: 400});
        }

        // IF SUCCESSFUL, SIGN OUT DEVICE & DELETE COOKIE
        await device.destroy();
        cookies.delete("session", {path: '/', httpOnly: true, sameSite: 'strict', secure: true});
        log("auth", `logging out user: ${username}`);
        return new Response(JSON.stringify("Successfully Logged Out"), {status: 200});
    });

    return result as unknown as Response;
}