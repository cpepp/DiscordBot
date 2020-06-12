const write = require("./../write.js");
const session = require("./../session.js");
const fs = require("fs");
const fetch = require("node-fetch");
const app = require("./../app.js");

exports.run = (client, message, args) => {
    //example commands
    //!ban [SMITE god name]
    //!ban remove [SMITE god name]
    //!ban list
    if (args.length == 0) {
        message.channel.send("Try !ban [SMITE god] to remove from your pool, ");
        message.channel.send("or use !ban list to see which Gods you've banned, ");
        message.channel.send("or use !ban remove [SMITE God] to add them back!");
        return;
    }

    for (var i = 0; i < client.userList.length; i++) {
        if (message.author.id === client.userList[i].id) {
            var banList = client.userList[i].bans;
            if (args[0] === 'list') { //lists banned gods
                var reply = message.author.username + "'s banned Gods are: ";
                for (var j = 0; j < banList.length; j++) {
                    reply += banList[j];
                    if (j != banList.length - 1) {
                        reply += ", "
                    }
                }
                message.channel.send(reply);
            } else if (args[0] === 'remove') { //removes a god from users ban list
                if (args.length < 2) {
                    message.channel.send("Specify a God to remove from ban list.");
                    return;
                }
                if (args[1] === 'all') {
                    banList.length = 0;
                    write.write(JSON.stringify(client.userList));
                    message.channel.send("Cleared " + message.author.username + "'s ban list.");
                    return;
                }
                var godName = '';
                for (var i = 1; i < args.length; i++) {
                    godName += args[i];
                }
                var ind = banList.indexOf(godName.toLowerCase());
                if (ind > -1) {
                    banList.splice(ind, 1);
                }
                write.write(JSON.stringify(client.userList));
                message.channel.send("Removed " + args[1] + " from " + message.author.username + "'s God ban list.");
            } else { //adds god to list
                var godName = '';
                args.forEach(str => { //for gods with multi string names, Ao Kuang, Hun Batz, etc.
                    godName += " " + str;
                });

                let godData = client.godList; //get gods list

                var gods = []; //array of lowercase god names
                Object.keys(godData).forEach(key => {
                    gods.push(godData[key].Name.toLowerCase());
                });
                if (gods.includes(godName.trim().toLowerCase()) && !banList.includes(godName.trim().toLowerCase())) { 
                    //if the god name is in this list, its viable to ban
                    banList.push(godName.trim().toLowerCase());
                    write.write(JSON.stringify(client.userList));
                    message.channel.send("Added " + godName + " to " + message.author.username + "'s ban list.");
                } else {
                    if (banList.includes(godName.trim().toLowerCase())) {
                        message.channel.send("SMITE God already banned.");
                    } else {
                        message.channel.send("Invalid SMITE God name given.");
                    }
                }
            }
        }
    }
}