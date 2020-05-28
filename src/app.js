/**
 * SMITE Discord Bot
 * 
 * @author Caden Pepper
 * @version 5/27/20
 */

const Discord = require("discord.js");
const fs = require("fs");
const Enmap = require("enmap");
const config = require("./../config.json");

const client = new Discord.Client();
client.config = config;

fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
	  if (!file.endsWith(".js")) return;
	  const event = require(`./events/${file}`);
	  let eventName = file.split(".")[0];
	  client.on(eventName, event.bind(null, client));
	  delete require.cache[require.resolve(`./events/${file}`)];
	});
  });

client.commands = new Enmap();

fs.readdir("./commands/", (e, files) => {
	if(e){
		return console.error(e);
	}
	files.forEach(file => {
		if(!file.endsWith(".js")){
			return;
		}
		let props = require(`./commands/${file}`);
		let commandName = file.split(".")[0];
		console.log(`Loading ${commandName}`);
		client.commands.set(commandName, props);
	});
});


client.login(config.token);