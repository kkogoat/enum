import fs from "fs";
import path from "path";

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ params }) => {
    const imgpath = path.resolve(`covers/${params.image}`);
    try {
        const image = fs.readFileSync(imgpath);
        return new Response(image);
    } catch {
        return new Response(JSON.stringify(`Image '${params.image}' is not found`), {status: 404});
    }
}