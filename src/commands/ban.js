const write = require("./../write.js");
const session = require("./../session.js");
const fs = require("fs");
const fetch = require("node-fetch");

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
            if (args[0] === 'list') {
                var reply = message.author.username + "'s banned Gods are: ";
                for (var j = 0; j < banList.length; j++) {
                    reply += banList[j];
                    if (j != banList.length - 1) {
                        reply += ", "
                    }
                }
                message.channel.send(reply);
            } else if (args[0] === 'remove') {
                if (args.length < 2) {
                    message.channel.send("Specify a God to remove from ban list.");
                    return;
                }
                if(args[1] === 'all'){
                    banList = [];
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
            } else {
                var godName = '';
                args.forEach(str => { //for gods with multi string names, Ao Kuang, Hun Batz, etc.
                    godName += str;
                });
                
                var millOffset = new Date().getTimezoneOffset() * 60000; //gets offset of local timezone from UTC
                var time = (Date.parse(client.sessionInfo.timestamp) - millOffset); //gets timestamp from session
                //since it's converted as if it were local, we have to subtract the offset to get the actual UTC time
                var diff = Date.now() - time; //finds time diff between now and when last session was made
                
                if(diff > 900000) { //since sessions are only 15 min, if the diff is greater a new session is created
                    console.log("Previous session is no longer valid.");
                    session.session(); //creates new session
                    fs.readFile("./../../session.json", function (er, jsonString) {
                        if(er) {
                            console.log("Failed ", er);
                            return;
                        }
                        console.log("Loading new session info.");
                        client.sessionInfo = JSON.parse(jsonString); //loads new session into variable
                    });
                }

                var URL = session.loadgods(client.sessionInfo.session_id);
                fetch(URL) //gets god list
                    .then(response => response.json())
                    .then(result => {
                        var gods = [];
                        result.forEach(god => {
                            gods.push(god.Name.toLowerCase());
                        });
                        if(gods.includes(godName.toLowerCase()) && !banList.includes(godName.toLowerCase())){ //if the god name is in this list, its viable to ban
                            banList.push(godName.toLowerCase());
                            write.write(JSON.stringify(client.userList));
                            message.channel.send("Added " + godName + " to " + message.author.username + "'s ban list.");
                        } else {
                            if(banList.includes(godName.toLowerCase())){
                                message.channel.send("SMITE God already banned.");
                            } else {
                                message.channel.send("Invalid SMITE God name given.");
                            }
                        }
                    });
            }
        }
    }

}