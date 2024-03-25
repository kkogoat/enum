import { ACCESS_TOKEN_SECRET } from "$env/static/private";
import jwt from "jsonwebtoken";

export const authenticateToken = async (header: string) => {
    // GET TOKEN
    const token = header.split(' ')[1];
    
    // EXPIRY CHECK
    const decoded = jwt.decode(token);
    if(Date.now() >= (decoded as JwtPayload).exp * 1000) return new Response(JSON.stringify("Unauthorized"), {status: 401});

    // VERIFY
    const result = await jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return new Response(JSON.stringify("Unauthorized"), {status: 401});
        return new Response(JSON.stringify("Allowed"), {status: 200});
    })

    // RETURN
    if((result as unknown as Response).ok) {
        return { username: (decoded as JwtPayload).username, status: 200};
    } else {
        return { username: "", status: 401};
    }
}