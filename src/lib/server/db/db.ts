import { DB_NAME, DB_USER, DB_PWD, DB_HOST, DB_PORT, APP_DEFAULT_ACC, APP_DEFAULT_PWD, APP_DEFAULT_ACC_CREATE } from '$env/static/private';
import { Sequelize } from "sequelize-typescript";
import User from './models/user.js';
import Media from "./models/media.js";
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
    models: [User, Media],
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

// DEFAULT ACCOUNT
if(APP_DEFAULT_ACC_CREATE == "true") {
    const instance = await User.findOne({where: {username: APP_DEFAULT_ACC}});
    if(!instance) {
        log("db", `created default account ${APP_DEFAULT_ACC}`)
        const body = {username: APP_DEFAULT_ACC.toLowerCase(), password: await bcrypt.hash(APP_DEFAULT_PWD, 10)};
        await User.create(body)
    }
}

export default sequelize;