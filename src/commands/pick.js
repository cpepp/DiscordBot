const fetch = require("node-fetch");
const session = require("./../session.js");
const fs = require("fs");

exports.run = (client, message, args) => {
    //example command
    //!pick [role] [SMITE username (optional)]
    if(args.length == 0){
        message.channel.send("Try !pick [class] [SMITE username (optional)] to get a random God pick!");
        return;
    }
    var role = args[0].trim().toLowerCase();
    var reply = message.author.username + ", your pick is: ";

    console.log(message.author.username + " is picking a " + role + "...");

    var millOffset = new Date().getTimezoneOffset() * 60000; //gets offset of local timezone from UTC
    var time = (Date.parse(client.sessionInfo.timestamp) - millOffset); //gets timestamp from session
    //since it's converted as if it were local, we have to subtract the offset to get the actual UTC time
    var diff = Date.now() - time; //finds time diff between now and when last session was made
    if(diff > 900000) { //since sessions are only 15 min, if the diff is greater a new session is created
        session.session(); //creates new session
        fs.readFile("./../session.json", function (er, jsonString) {
			if(er) {
				console.log("Failed ", er);
				return;
			}
			console.log("Loading new session info.");
			client.sessionInfo = JSON.parse(jsonString); //loads new session into variable
		});
    }

    const roleList = ['guardian', 'hunter', 'mage', 'assassin', 'warrior'];
    var val = roleList.includes(role);
    if(val == false){
        message.channel.send("Invalid role type given.");
        return;
    }

    var URL = session.loadgods(client.sessionInfo.session_id); //creates URL for getgods method
    fetch(URL)
    .then(response => response.json())
    .then(result => {
        var gods = [];
        var link = '';
        for(var i = 0; i < result.length; i++){
            if(result[i].Roles.trim().toLowerCase() === role){
                gods.push(result[i]);
            }
        }
        var p = Math.floor(Math.random() * gods.length);
        console.log(gods[p]);
        message.channel.send(reply + gods[p].Name, 
                            {files: [gods[p].godIcon_URL]});
    });
}
