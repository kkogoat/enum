import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '$env/static/private';
import jwt from "jsonwebtoken";

export const generateTokens = (username: object) => {
    const access_token: string = jwt.sign(username, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refresh_token: string = jwt.sign(username, REFRESH_TOKEN_SECRET, { expiresIn: '24h' });
    return { access_token: access_token, refresh_token: refresh_token };
}