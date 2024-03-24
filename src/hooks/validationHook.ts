import joi from "joi";

const loginSchema = joi.object({
    username: joi.string().min(4).max(15).alphanum().required(),
    password: joi.string().min(8).max(30).pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]+$')).required(),
});

const logoutSchema = joi.object({
    username: joi.string().min(4).max(15).alphanum().required()
});

const mediaAddSchema = joi.object({
    title: joi.string().min(1).max(100).required(),
    link: joi.string().min(1).max(100).uri(),
    current_episode: joi.number().min(0).max(2147483647),
    total_episodes: joi.number().min(0).max(2147483647),
    rating: joi.number().min(0).max(10),
    description: joi.string().min(0).max(200),
    status: joi.string().valid('','Completed','In Progress','Planned'),
    type: joi.string().valid('','Anime','Cartoon','C-Drama','J-Drama','K-Drama','Manga','Manhwa','Manhua')
});

const schemaTable: {[key: string]: any} = {
    "/api/auth/login" : loginSchema,
    "/api/auth/logout": logoutSchema,
    "/api/media/add": mediaAddSchema,
}

export const validator = async (api: string, request: any) => {
    if(schemaTable[api]) {
        const params = await request.json();
        const { _, error } = schemaTable[api].validate(params)
        return error;
    }
    return 0;
}