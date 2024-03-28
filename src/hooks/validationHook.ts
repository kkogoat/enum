import { PUBLIC_ALLOWED_TYPES, PUBLIC_ALLOWED_TYPES_DELIMITER } from "$env/static/public";
import { log } from "$lib/server/util/loggerUtil";
import joi from "joi";

const loginSchema = joi.object({
    username: joi.string().min(4).max(15).alphanum().required(),
    password: joi.string().min(8).max(30).pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]+$')).required(),
});

const logoutSchema = joi.object({
    username: joi.string().min(4).max(15).alphanum().required()
});

const changeSchema = joi.object({
    current: joi.string().min(8).max(30).pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]+$')).required(),
    newPass: joi.string().min(8).max(30).pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]+$')).required(),
})

const mediaAddSchema = joi.object({
    title: joi.string().min(1).max(100).required(),
    link: joi.string().min(1).max(100).uri().allow('', null),
    current_episode: joi.number().min(0).max(2147483647),
    total_episodes: joi.number().min(0).max(2147483647).allow(null),
    rating: joi.number().min(0).max(10).allow(null),
    description: joi.string().min(0).max(200).allow(null),
    status: joi.string().valid('','Completed','In Progress','Planned'),
    type: joi.string().valid('', ...PUBLIC_ALLOWED_TYPES.split(PUBLIC_ALLOWED_TYPES_DELIMITER))
});

const mediaEditSchema = mediaAddSchema.append({
    id: joi.string().uuid().required()
});

const mediaDeleteSchema = joi.object({
    id: joi.string().uuid().required()
});

const schemaTable: {[key: string]: any} = {
    "/api/auth/login" : loginSchema,
    "/api/auth/signup" : loginSchema,
    "/api/auth/logout": logoutSchema,
    "/api/auth/change": changeSchema,
    "/api/media/add": mediaAddSchema,
    "/api/media/edit": mediaEditSchema,
    "/api/media/delete": mediaDeleteSchema
}

export const validator = async (api: string, request: any) => {
    if(schemaTable[api]) {
        const params = await request.json();
        const { _, error } = schemaTable[api].validate(params)
        if(!error) log('joi', `Validated ${api} request`);
        else log('joi', `Rejected ${api} request: ${error}`);
        return error;
    }
    return 0;
}