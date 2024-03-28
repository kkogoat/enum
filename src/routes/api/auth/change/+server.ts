import User from "$lib/server/db/models/user.js";
import { log } from "$lib/server/util/loggerUtil.js";
import bcrypt from "bcrypt";

/** @type {import('./$types').RequestHandler} */
export const PUT = async({ request, locals }) => {
    let body = await request.json();
    let username = locals.username;
    let newPass = await bcrypt.hash(body.newPass, 10);
    
    // CHECK IF PASSWORDS CONFIRMED
    if(body.newPass != body.confirm) {
        return new Response(JSON.stringify({message: "Pasword Confirmation does not match"}), {status: 400});
    }

    // GET USER INSTANCE
    const instance = await User.findOne({
        where: { username: username}
    });
    if(!instance) {
        return new Response(JSON.stringify({message: "User does not exist"}), {status: 404});
    }

    // CHECK IF PASSWORD MATCHES
    if(!await bcrypt.compare(body.current, instance.password)) {
        return new Response(JSON.stringify("Wrong current password"), {status: 401});
    }

    // CHANGE PASSWORD
    User.update(
        {password: newPass},
        {where: {id: instance.id, username: username}}
    ).catch((error) => {
        log(`auth`, `Failed to change password for ${username}`);
        return new Response(JSON.stringify({message: "Please try again later"}), {status: 500});
    })
    log(`auth`, `Successfully changed password for ${username}`);

    return new Response(JSON.stringify({message: "Successfully changed password"}), {status: 200});
}