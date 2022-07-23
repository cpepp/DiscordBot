const write = require("../write.js");

module.exports = (client, message) => {

    if (message.author.bot || !message.content.startsWith(process.env.prefix)) {
        return;
    }
/*
    let noAccount = true;
    for (var i = 0; i < client.userList.length; i++) { //checks if user already has data in json, probably better way to check
        if (client.userList[i].id === message.author.id) {
            noAccount = false;
            break;
        }
    }

    if (noAccount) { //if they aren't, a new account is made to track their bans
    let info = {
            id: message.author.id,
            name: message.author.username,
            bans: []
        };
        client.userList.push(info);
        write.write(JSON.stringify(client.userList));
        console.log("Added new user: " + message.author.username + " with ID " + message.author.id);
    }
*/
    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if (!cmd) {
        return;
    }

    cmd.run(client, message, args);
};