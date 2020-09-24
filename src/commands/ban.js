const write = require("./../write.js");

exports.run = (client, message, args) => {
    //example commands
    //!ban [SMITE god name]
    //!ban remove [SMITE god name]
    //!ban list
    if (args.length == 0) {
        message.channel.send("Try !ban [SMITE god] to remove from your pool, ");
        message.channel.send("or use !ban list to see which Gods you've banned, ");
        message.channel.send("or use !ban remove [SMITE God] (or all) to add them back!");
        return;
    }

    let banList; //ban list of user that did the command

    for (var i = 0; i < client.userList.length; i++) { //finding user that did command
        if (message.author.id === client.userList[i].id) {
            banList = client.userList[i].bans;
            break;
        }
    }

    if (args[0] === 'list') { //lists banned gods
        let reply = "your banned Gods are: ";
        for (var j = 0; j < banList.length; j++) {
            reply += banList[j];
            if (j != banList.length - 1) {
                reply += ", "
            }
        }
        message.reply(reply);
    } else if (args[0] === 'remove') { //removes a god from users ban list
        if (args.length < 2) {
            message.reply("please specify a God to remove from ban list.");
            return;
        }
        if (args[1] === 'all') {
            banList.length = 0;
            write.write(JSON.stringify(client.userList));
            message.reply("your ban list has been cleared.");
            return;
        }
        let godName = '';
        for (var k = 1; k < args.length; k++) {
            godName += " " + args[k];
        }
        godName = godName.trim().toLowerCase();
        let ind = banList.indexOf(godName);
        if (ind > -1) {
            banList.splice(ind, 1);
            write.write(JSON.stringify(client.userList));
            message.reply("removed " + godName + " from your ban list.");
        } else {
            message.reply("could not remove from ban list.");
        }

    } else { //adds god to list
        let godName = '';
        args.forEach(str => { //for gods with multi string names, Ao Kuang, Hun Batz, etc.
            godName += " " + str;
        });

        let godData = client.godList; //get gods list

        let gods = []; //array of lowercase god names
        Object.keys(godData).forEach(key => {
            gods.push(godData[key].Name.toLowerCase());
        });
        if (gods.includes(godName.trim().toLowerCase()) && !banList.includes(godName.trim().toLowerCase())) {
            //if the god name is in this list, its viable to ban
            banList.push(godName.trim().toLowerCase());
            write.write(JSON.stringify(client.userList));
            message.reply(godName + " has been added to your ban list.");
        } else {
            if (banList.includes(godName.trim().toLowerCase())) {
                message.reply("SMITE God already banned.");
            } else {
                message.reply("invalid SMITE God name given.");
            }
        }
    }
}