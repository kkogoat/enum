import { DB_NAME, DB_USER, DB_PWD, DB_HOST, DB_PORT } from '$env/static/private';
import { PUBLIC_DEMO, PUBLIC_DEMO_ACC, PUBLIC_DEMO_PWD } from '$env/static/public';
import { Sequelize } from "sequelize-typescript";
import User from './models/user.js';
import Media from "./models/media.js";
import Device from './models/device.js';
import { log } from '../util/loggerUtil.js';
import bcrypt from "bcrypt";

// DB CONFIG
const sequelize = new Sequelize ({
    database: DB_NAME,
    dialect: 'mysql',
    username: DB_USER,
    password: DB_PWD,
    host: DB_HOST,
    port: Number(DB_PORT),
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
if(PUBLIC_DEMO === "true") {
    const instance = await User.findOne({where: {username: PUBLIC_DEMO_ACC}});
    if(!instance) {
        log("db", `created demo account ${PUBLIC_DEMO_ACC}`)
        const body = {username: PUBLIC_DEMO_ACC.toLowerCase(), password: await bcrypt.hash(PUBLIC_DEMO_PWD, 10)};
        await User.create(body)
    }
}

export default sequelize;