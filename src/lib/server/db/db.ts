import { env } from "$env/dynamic/private";
import { env as envPublic } from "$env/dynamic/public";
import { Sequelize } from "sequelize-typescript";
import User from './models/user.js';
import Media from "./models/media.js";
import Device from './models/device.js';
import { log } from '../util/loggerUtil.js';
import bcrypt from "bcrypt";

// DB CONFIG
const sequelize = new Sequelize ({
    database: env.DB_NAME,
    dialect: 'mysql',
    username: env.DB_USER,
    password: env.DB_PWD,
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    logging: false,
    // logging: (msg) => {
    //     log("db", msg)
    // },
    models: [User, Media, Device],
});

// DB CONNECTION
try {
    await sequelize.authenticate();
    log("db", 'connection established');
} catch(err) {
    log("db", 'connection unable to establish');
}

// DB SYNC
try {
    await sequelize.sync();
    log("db", 'data models synced');
} catch(err) {
    log("db", 'data models unable to sync');
}

// DEMO ACCOUNT
if(envPublic.PUBLIC_DEMO === "true") {
    const instance = await User.findOne({where: {username: envPublic.PUBLIC_DEMO_ACC}});
    if(!instance) {
        log("db", `created demo account ${envPublic.PUBLIC_DEMO_ACC}`)
        const body = {username: envPublic.PUBLIC_DEMO_ACC.toLowerCase(), password: await bcrypt.hash(envPublic.PUBLIC_DEMO_PWD, 10)};
        await User.create(body)
    }
}

export default sequelize;