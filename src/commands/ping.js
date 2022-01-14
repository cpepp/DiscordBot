const fetch = require("node-fetch");
/**
 * Account Info
 *
 * @author Caden Pepper
 * @version 8/22/21
 */

 exports.run = async (client, message, args) => {
    const url = "https://api.smitegame.com/smiteapi.svc/pingJson";
    await fetch(url)
        .then(response => response.json())
        .then(result => console.log(result));
};