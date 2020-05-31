const write = require("./../write.js");

module.exports = (client, message) =>{
    if(message.author.bot || !message.content.startsWith(client.config.prefix)){
		return;	
    }

    var noAccount = true;
    for(var i = 0; i < client.userList.length; i++){
        if(client.userList[i].id === message.author.id){
            noAccount = false;
            break;
        }
    }

    if(noAccount){
        var info = {
            id : message.author.id,
            name : message.author.username,
            bans: [ ]
        };
        client.userList.push(info);
        write.write(JSON.stringify(client.userList));
        console.log("Added new user: " + message.author.username + " with ID " + message.author.id);
    }
    
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    const cmd = client.commands.get(command);

    if(!cmd){
        return;
    }
    
    cmd.run(client, message, args);
};