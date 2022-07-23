/**
 * Marvel quote
 *
 * @author Caden Pepper
 * @version 7/22/22
 */

 const fetch = require("node-fetch");

 exports.run = async (client, message, args) => {
    const req = "https://randommarvelquoteapi.herokuapp.com/"

    await fetch(req)
    .then(response => response.json())
    .then(result => message.channel.send(result.quote))
 };

 exports.name="marvel"