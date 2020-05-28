exports.run = (client, message, args) => {
    if(message.author.username === client.config.owner){ //need to update to id later, anyone with same username can stop
        client.destroy();
    }
}