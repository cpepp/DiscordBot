const fetch = require("node-fetch");

exports.run = async (client, message, args) => {
    //example command
    //!pick [role] [SMITE username (optional)]
    if (args.length == 0) {
        message.channel.send("Try !pick [class] [SMITE username (optional)] to get a random God pick!");
        return;
    }
    let role = args[0].trim().toLowerCase();
    const reply = "your pick is: ";

    console.log(message.author.username + " is picking a " + role + "...");

    const roleList = ['guardian', 'hunter', 'mage', 'assassin', 'warrior'];
    if (!roleList.includes(role)) {
        message.channel.send("Invalid role type given.");
        return;
    }

    let user = '';
    for (var i = 0; i < client.userList.length; i++) {
        if (client.userList[i].id == message.author.id) {
            user = client.userList[i]; //getting the user, to know which banlist to use
            break;
        }
    }

    let godData = client.godList;

    let gods = [];
    Object.keys(godData).forEach(key => {
        if (godData[key].Roles.trim().toLowerCase() === role) {
            gods.push(godData[key]);
        }
    });

    let subgods = gods.filter(function (ind) { //fix to filter ban list
        return user.bans.indexOf(ind) === -1;
    });

    let p = Math.floor(Math.random() * subgods.length);

    message.reply(reply + subgods[p].Name,
        { files: [subgods[p].godIcon_URL] });
}