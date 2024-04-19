import { env } from "$env/dynamic/private"; 
import { jwtErrorHandling } from "$lib/server/util/authUtil";
import jwt from "jsonwebtoken";

export const authenticateToken = async (header: string) => {
    // GET TOKEN
    const access = header.split(' ')[1];
    
    // VERIFY TOKEN
    return await jwt.verify(access, env.ACCESS_TOKEN_SECRET, async (err, user) => {
        // ERRORS?
        if(err) return await jwtErrorHandling(err);

        // IF NO ERRORS
        return new Response(JSON.stringify({username: (user as JwtPayload).username}), {status: 200});
    });
}