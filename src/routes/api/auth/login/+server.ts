/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
    const body = await request.json();
    console.log(body);
    return new Response(JSON.stringify("Hello"), {status: 200});
}