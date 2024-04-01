import { ACCESS_TOKEN_SECRET } from "$env/static/private";
import jwt from "jsonwebtoken";

function jwtErrorHandling(err: any) {
    switch(err.name) {
        case "NotBeforeError":
        case "TokenExpiredError": // Expired Token
            return new Response(JSON.stringify(err.message), {status: 401});
        case "JsonWebTokenError": // Unprocessable Refresh
            return new Response(JSON.stringify("Bad Refresh Token"), {status: 422});
    }
}

export const authenticateToken = async (header: string) => {
    // GET TOKEN
    const access = header.split(' ')[1];
    
    // VERIFY TOKEN
    return await jwt.verify(access, ACCESS_TOKEN_SECRET, async (err, user) => {
        // ERRORS?
        if(err) return await jwtErrorHandling(err);

        // IF NO ERRORS
        return new Response(JSON.stringify({username: (user as JwtPayload).username}), {status: 200});
    });
}