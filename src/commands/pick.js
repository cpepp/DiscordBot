exports.run = (client, message, args) => {
    //example command
    //!pick [role] [SMITE username (optional)]
    if(args.length == 0){
        message.channel.send("Try !pick [role] [SMITE username (optional)] to get a random God pick!");
        return;
    }
    var role = args[0].toLowerCase();
    var reply = message.author.username + ", your pick is: ";
    var hunters = ["Ullr", "Rama", "Artemis", "Anhur"];
	if(role === 'hunter') {
        var p = Math.floor(Math.random() * hunters.length);
		message.channel.send(reply + hunters[p]); //replace with api call
	} else if(role === 'mage') {
        message.channel.send(reply);
    } else if(role === 'guardian') {
        message.channel.send(reply);
    } else if(role === 'warrior') {
        message.channel.send(reply);
    } else if(role === 'assassin') {
        message.channel.send(reply);
    } else if(role === 'jungle') {
        message.channel.send(reply);
    } else if(role === 'support') {
        message.channel.send(reply);
    } else if(role === 'adc') {
        message.channel.send(reply);
    } else if(role === 'carry') {
        message.channel.send(reply);
    } else if(role === 'mid') {
        message.channel.send(reply);
    } else if(role === 'solo') {
        message.channel.send(reply);
    } else if(role === 'healer') {
        message.channel.send(reply);
    }
}