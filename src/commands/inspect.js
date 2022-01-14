/**
 * Account Info
 *
 * @author Caden Pepper
 * @version 11/7/20
 */

exports.run = async (client, message, args) => {
    const session = require("../session.js");
    let name = args[0].trim();
    let matches = args[1].trim();
    let x = await Promise.resolve(session.getInformation(client.sessionInfo.session_id, name));
    for (var i = 0; i < matches; i++) {
        let match = x[i];
        let mes = "";
        mes += "Name: " + match.playerName;
        mes += "\nGod: " + match.God;
        mes += "\nK/D/A: " + match.Kills + "/" + match.Deaths + "/" + match.Assists;
        mes += "\nMatch ID: " + match.Match;
        mes += "\n" + match.Win_Status;
        message.channel.send(mes);
        console.log(x[i]);
    }
};
