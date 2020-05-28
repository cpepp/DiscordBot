exports.run = (client, message, args) => {
    if(message.author.username === client.config.owner){
        client.destroy();
    }
}