import { env as envPublic } from "$env/dynamic/public"; 
import joi from "joi";

const login_schema = joi.object({
    username: joi.string().min(4).max(15).alphanum().required(),
    password: joi.string().min(8).max(30).pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]+$')).required(),
});

const change_schema = joi.object({
    current: joi.string().min(8).max(30).pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]+$')).required(),
    newPass: joi.string().min(8).max(30).pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]+$')).required(),
    confirm: joi.string().min(8).max(30).pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]+$')).required(),
})

const media_add_schema = joi.object({
    title: joi.string().min(1).max(100).required(),
    link: joi.string().min(1).max(100).uri().allow(''),
    current_episode: joi.number().min(0).max(2147483647),
    total_episodes: [joi.number().min(0).max(2147483647), joi.allow(null)],
    rating: [joi.number().min(0).max(10), joi.allow(null)],
    description: joi.string().min(0).max(200).allow(null),
    status: joi.string().valid('','Completed','In Progress','Planned','Dropped'),
    type: joi.string().valid('', ...envPublic.PUBLIC_ALLOWED_TYPES.split(envPublic.PUBLIC_ALLOWED_TYPES_DELIMITER)),
    image: joi.object({
        type: joi.string().valid("image/png", "image/jpeg"),
        size: joi.number().min(1).max(5242880).messages({
            'number.min': `"image" should have a minimum size of 1 Byte`,
            'number.max': `"image" should have a maximum size of 5 MB`
        })
    }).allow(null)
});

const media_edit_schema = media_add_schema.append({
    id: joi.string().uuid().required()
});

const media_delete_schema = joi.object({
    id: joi.string().uuid().required()
});

const import_schema = joi.array().items(joi.object({
    id: joi.any(),
    title: joi.string().min(1).max(100).required(),
    link: joi.string().min(1).max(100).uri().allow('', null),
    current_episode: joi.number().min(0).max(2147483647),
    total_episodes: joi.number().min(0).max(2147483647).allow(null),
    rating: joi.number().min(0).max(10).allow(null),
    description: joi.string().min(0).max(200).allow(null),
    status: joi.string().valid('','Completed','In Progress','Planned','Dropped'),
    type: joi.string().valid('', ...envPublic.PUBLIC_ALLOWED_TYPES.split(envPublic.PUBLIC_ALLOWED_TYPES_DELIMITER)),
    image: joi.any()
}));

const api_path_to_schema_map: {[key: string]: joi.AnySchema} = {
    "/api/auth/login" : login_schema,
    "/api/auth/signup" : login_schema,
    "/api/auth/change": change_schema,
    "/api/media/add": media_add_schema,
    "/api/media/edit": media_edit_schema,
    "/api/media/delete": media_delete_schema,
    "/api/media/import": import_schema
}

const multi_part_path: Set<string> = new Set([
    "/api/media/add",
    "/api/media/edit",
]);

export const validator = async (api_path: string, request: Request): Promise<Response | null> => {
    // PROCESS JOI PATH
    if(api_path_to_schema_map[api_path]) {
        let object_to_validate: Object;

        // MULTIPART FORM DATA
        if(multi_part_path.has(api_path)) {
            // GET FORM DATA
            let form_data: FormData;
            try { form_data = await request.formData(); }
            catch(error) { return new Response("Unprocessable Data", {status: 422}); }

            // BUILD OBJECT TO VALIDATE
            let object_build: {[key: string]: FormDataEntryValue | Object} = {};
            for(const pair of form_data.entries()) { object_build[pair[0]] = pair[1]; }
            if(form_data.get("image")) {
                object_build["image"] = {type: (form_data.get("image") as File).type, size: (form_data.get("image") as File).size};
            }
            object_to_validate = object_build;
        }
        // JSON DATA
        else {
            try { object_to_validate = await request.json(); }
            catch(error) { return new Response("Unprocessable Data", {status: 422}); }
        }

        // VALIDATE OBJECT & CHECK FOR ERRORS
        const { error } = api_path_to_schema_map[api_path].validate(object_to_validate);
        if(!error) {
            return new Response(`Validated ${api_path} request`, {status: 200});
        }

        // ERROR OCCURRED
        return new Response(`${error.message}`, {status: 400});
    }

    // NOT JOI PATH
    return null;
}