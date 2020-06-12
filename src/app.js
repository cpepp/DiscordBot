/**
 * SMITE Discord Bot
 * 
 * Thanks to https://anidiots.guide/
 * 
 * @author Caden Pepper
 * @version 5/27/20
 */

const Discord = require("discord.js");
const fs = require("fs");
const fspr = require("fs").promises;
const Enmap = require("enmap");
const config = require("./../config.json");
const write = require("./write.js");
const session = require("./session.js");
const client = new Discord.Client();
client.config = config;

client.sessionInfo;

var sess = async () => {
	let info = await fspr.readFile("./../session.json", "utf-8");
	console.log("Loading session info.");
	return JSON.parse(info);
}

client.godList;
var lGods = async () => {
	try {
		let check = await session.checkSession();
		if (check) {
			await session.createSession();
		}
		client.sessionInfo = await sess();
		client.godList = await session.loadgods(client.sessionInfo.session_id);
	} catch (error) {
		console.log(error);
	}

}

lGods(); //loads gods into godList variable for global use

var userList = [];
client.userList = userList;

try {
	if (fs.existsSync("./../users.json")) {
		fs.readFile("./../users.json", function (er, jsonString) {
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
	if (e) {
		return console.error(e);
	}
	files.forEach(file => {
		if (!file.endsWith(".js")) {
			return;
		}
		let props = require(`./commands/${file}`);
		let commandName = file.split(".")[0];
		console.log(`Loading ${commandName}`);
		client.commands.set(commandName, props);
	});
});

client.login(config.token);