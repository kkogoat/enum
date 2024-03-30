import { PUBLIC_ALLOW_MAX_ACC, PUBLIC_ALLOW_MAX_LIMIT, PUBLIC_ALLOW_NEW_ACC } from '$env/static/public';
import User from '$lib/server/db/models/user.js';
import { log } from '$lib/server/util/loggerUtil.js';
import bcrypt from "bcrypt";

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
    // ALLOW NEW ACCOUNTS ENV
    if(PUBLIC_ALLOW_NEW_ACC == "false") {
        return new Response(JSON.stringify({message: "Invalid Method"}), {status: 405});
    }

    // MAX # OF ACCOUNTS ENV
    if(PUBLIC_ALLOW_MAX_LIMIT == "true") {
        let numAccs = (await User.findAll({raw: true})).length;
        if(numAccs >= parseInt(PUBLIC_ALLOW_MAX_ACC)) {
            return new Response(JSON.stringify({message: "Invalid Method: Max # of accounts reached"}), {status: 405});
        }
    }

    // GET USERNAME & SALTED PWD
    const body = await request.json();
    let username: string = body.username;
    let password: string = await bcrypt.hash(body.password, 10);

    // CHECK IF USER ALREADY EXISTS
    const check = await User.findOne({
        where: { username: username }
    });
    if(check) {
        log(`auth`, `Username ${username} already exists`);
        return new Response(JSON.stringify({message: "Username already exists"}), {status: 409});
    }

    // ADD USER TO MODEL
    await User.create({
        username: username,
        password: password
    }).catch(( error ) => {
        console.log(error);
        log(`auth`, `Server error while creating ${username} account`);
        return new Response(JSON.stringify({message: "Please try again later"}), {status: 500});
    })
    log(`auth`, `Successfully created user ${username}`);

    // RESPONSE
    return new Response(JSON.stringify({
        message: "Successfully created account"
    }), {status: 200});
}