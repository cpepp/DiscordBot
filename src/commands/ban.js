const write = require("./../write.js");

exports.run = (client, message, args) => {
    //example commands
    //!ban [SMITE god name]
    //!ban remove [SMITE god name]
    //!ban list
    if(args.length == 0){
        message.channel.send("Try !ban [SMITE god] to remove from your pool, ");
        message.channel.send("or use !ban list to see which Gods you've banned, ");
        message.channel.send("or use !ban remove [SMITE God] to add them back!");
        return;
    }

    for(var i = 0; i < client.userList.length; i++){
        if(message.author.id === client.userList[i].id){
            var banList = client.userList[i].bans;
            if(args[0] === 'list'){
                var reply = message.author.username + "'s banned Gods are: ";
                for(var j = 0; j < banList.length; j++){
                    reply += banList[j];
                    if(j != banList.length - 1){
                        reply += ", "
                    }
                }
                message.channel.send(reply);
            } else if(args[0] === 'remove') {
                if(args.length != 2){
                    message.channel.send("Specify a God to remove from ban pool.");
                    return;
                }
                var ind = banList.indexOf(args[1]);
                if(ind > -1){
                    banList.splice(ind, 1);
                }
                write.write(JSON.stringify(client.userList));
                message.channel.send("Removed " + args[1] + " from " + message.author.username + "'s God ban list.");
            } else {
                //need to add checks to see if god is viable name and if it is already in players ban pool
                banList.push(args[0]);
                write.write(JSON.stringify(client.userList));
                message.channel.send("Banned " + args[0] + " from " + message.author.username + "'s God selection pool.");
            }
        }
    }
    
}