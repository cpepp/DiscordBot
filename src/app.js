/**
 * SMITE Discord Bot
 * 
 * Thanks to https://anidiots.guide/
 * 
 * @author Caden Pepper
 * @version 5/27/20
 */

const {Client, GatewayIntentBits, Collection} = require("discord.js");
const fs = require("fs");
const fspr = require("fs").promises;
const config = require("./../config.json");
const write = require("./write.js");
const session = require("./session.js");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent]});
client.config = config;

client.sessionInfo;

/*
const sess = async () => {
	let info = await fspr.readFile("./session.json", "utf-8");
	console.log("Loading session info.");
	return JSON.parse(info);
}

client.godList;
const lGods = async () => {
	try {
		let check = Promise.resolve(session.checkSession());
		if (check) {
			await session.createSession();
		}
		client.sessionInfo = await sess();
		client.godList = session.loadgods(client.sessionInfo.session_id);
	} catch (error) {
		console.log(error);
	}

}

lGods(); //loads gods into godList variable for global use


let userList = [];
client.userList = userList;

try {
	if (fs.existsSync("./users.json")) {
		fs.readFile("./users.json", function (er, jsonString) {
			if (er) {
				console.log("Failed ", er);
				return;
			}
			console.log("Read users file");
			client.userList = JSON.parse(jsonString);
		});
	} else {
		write.write(JSON.stringify(userList));
	}
} catch (err) {
	console.error(err);
}
*/

const events = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}

client.commands = new Collection();

const commands = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);

  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(commandName, command);
}

client.login(config.token);