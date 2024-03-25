import { LOGGING_ENABLED } from "$env/static/private";
import fs from "fs";

// LOG CREATION
let today: Date = new Date();
let todayString: string = String(today.getMonth()+1).padStart(2, '0') + '-'
                        + String(today.getDate()).padStart(2, '0') + '-'
                        + String(today.getFullYear());

const serverFS = LOGGING_ENABLED == "false" ? null : fs.createWriteStream(
    `./logs/${todayString}_server.log`, 
    {'flags': 'w'} // @TODO CHANGE TO APPEND WHEN BACKEND IN FINISHED STATE
);

// LOGGER
export const log = (system: string, message: string) => {
    if(LOGGING_ENABLED == "false") return;

    // MSG BUILING
    let currTime: Date = new Date();
    let timestamp: string = String(currTime.getHours()).padStart(2, '0') + ":"
                            + String(currTime.getMinutes()).padStart(2, '0') + ":"
                            + String(currTime.getSeconds()).padStart(2, '0');

    let msg: string = "[" + timestamp + "] ";
    msg += "[" + system + "] ";
    msg += message + "\n";

    // WRITE
    if(serverFS) serverFS.write(msg);
}