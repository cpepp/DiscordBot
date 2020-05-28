exports.run = (client, message, args) => {
    var hunters = ["Ullr", "Rama", "Artemis", "Anhur"];
	if(args[0].toLowerCase() === 'hunter') {
        var p = Math.floor(Math.random() * hunters.length);
		message.channel.send("Your pick is: " + hunters[p]); //replace with api call
	} else if(args[0].toLowerCase() === 'mage') {
        message.channel.send("Your pick is: ");
    } else if(args[0].toLowerCase() === 'guardian') {
        message.channel.send("Your pick is: ");
    } else if(args[0].toLowerCase() === 'warrior') {
        message.channel.send("Your pick is: ");
    } else if(args[0].toLowerCase() === 'assassin') {
        message.channel.send("Your pick is: ");
    } else if(args[0].toLowerCase() === 'jungle') {
        message.channel.send("Your pick is: ");
    } else if(args[0].toLowerCase() === 'support') {
        message.channel.send("Your pick is: ");
    } else if(args[0].toLowerCase() === 'adc') {
        message.channel.send("Your pick is: ");
    } else if(args[0].toLowerCase() === 'carry') {
        message.channel.send("Your pick is: ");
    } else if(args[0].toLowerCase() === 'mid') {
        message.channel.send("Your pick is: ");
    } else if(args[0].toLowerCase() === 'solo') {
        message.channel.send("Your pick is: ");
    }
}