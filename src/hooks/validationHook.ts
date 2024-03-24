import joi from "joi";

const loginSchema = joi.object({
    username: joi.string().min(4).max(15).alphanum().required(),
    password: joi.string().min(8).max(30).pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]+$')).required(),
});

const schemaTable: {[key: string]: any} = {
    "/api/auth/login" : loginSchema
}

export const validator = async (api: string, request: any) => {
    if(schemaTable[api]) {
        const params = await request.json();
        const { _, error } = schemaTable[api].validate(params)
        return error;
    }
    return 0;
}