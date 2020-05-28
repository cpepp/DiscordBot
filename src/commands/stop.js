/**
 * !stop command
 * Close from Discord.
 */

exports.run = (client, message, args) => {
    if(message.author.id === client.config.owner) {
        client.destroy();
    }
}