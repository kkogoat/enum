import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET } from '$env/static/private';
import { log } from './loggerUtil';
import jwt from "jsonwebtoken";

export const generateTokens = (details: {username: string, device_id: string}) => {
    log('auth', `generating tokens for ${details.username}:${details.device_id}`)
    const access_token: string = jwt.sign(details, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refresh_token: string = jwt.sign(details, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
    return { access_token: access_token, refresh_token: refresh_token };
}

export const jwtErrorHandling = (err: any) => {
    switch(err.name) {
        case "NotBeforeError":
        case "TokenExpiredError": // Expired Token
            return new Response(JSON.stringify(err.message), {status: 401});
        case "JsonWebTokenError": // Unprocessable Refresh
            return new Response(JSON.stringify("Bad Refresh Token"), {status: 422});
    }
}