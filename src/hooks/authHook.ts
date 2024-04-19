import { env } from "$env/dynamic/private"; 
import { jwt_error_handling } from "$lib/server/util/authUtil";
import jwt from "jsonwebtoken";

const explicit_protected_paths: Set<string> = new Set([
    // API ROUTES
    '/api/auth/logout',
    '/api/auth/change',
    '/api/auth/get-devices',
    '/api/auth/logout-device',

    // MEDIA ROUTES
    '/api/media/add',
    '/api/media/delete',
    '/api/media/edit',
    '/api/media/get-list',
    '/api/media/import',
])

const process_token_from_header = (header: string): Response => {
    // GET TOKEN
    const header_array: Array<string> = header.split(' ');
    const token: string | null = header_array.length ? header_array[1] : null;

    // VERIFY TOKEN
    return jwt.verify(token as string, env.ACCESS_TOKEN_SECRET, (err, user): Response => {
        // ERRORS?
        if(err) return jwt_error_handling(err);

        // IF NO ERRORS
        return new Response((user as JwtPayload).username, {status: 200});
    }) as any as Response;
}

export const authorize = (api_path: string, request: Request): Response | null => {
    
    // PROCESS PROTECTED PATH
    if(explicit_protected_paths.has(api_path)) {
        // IF HEADER DOES NOT EXIST
        const header: string | null = request.headers.get("authorization");
        if(!header) return new Response("No authorization header provided", {status: 302, headers: { Location: '/' }});

        // HEADER EXISTS
        return process_token_from_header(header);
    }
       
    return null;
}