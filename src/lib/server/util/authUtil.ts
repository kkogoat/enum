import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET } from '$env/static/private';
import jwt from "jsonwebtoken";

export const generateTokens = (username: object) => {
    const access_token: string = jwt.sign(username, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refresh_token: string = jwt.sign(username, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
    return { access_token: access_token, refresh_token: refresh_token };
}