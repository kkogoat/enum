import { DB_NAME, DB_USER, DB_PWD, DB_HOST, DB_PORT } from '$env/static/private';
import { Sequelize } from "sequelize-typescript";
import User from './models/user.js';
import Media from "./models/media.js";
import { log } from '../util/loggerUtil.js';

// DB CONFIG
const sequelize = new Sequelize ({
    database: DB_NAME,
    dialect: 'mysql',
    username: DB_USER,
    password: DB_PWD,
    host: DB_HOST,
    port: Number(DB_PORT),
    logging: (msg) => {
        log("db", msg)
    },
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

export default sequelize;