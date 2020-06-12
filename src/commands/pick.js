const fetch = require("node-fetch");

exports.run = async (client, message, args) => {
    //example command
    //!pick [role] [SMITE username (optional)]
    if (args.length == 0) {
        message.channel.send("Try !pick [class] [SMITE username (optional)] to get a random God pick!");
        return;
    }
    var role = args[0].trim().toLowerCase();
    var reply = "your pick is: ";

    console.log(message.author.username + " is picking a " + role + "...");

    const roleList = ['guardian', 'hunter', 'mage', 'assassin', 'warrior'];
    var val = roleList.includes(role);
    if (!val) {
        message.channel.send("Invalid role type given.");
        return;
    }

    var user = '';
    for (var i = 0; i < client.userList.length; i++) {
        if (client.userList[i].id == message.author.id) {
            user = client.userList[i]; //getting the user, to know which banlist to use
            break;
        }
    }

    let godData = client.godList;

    var gods = [];
    Object.keys(godData).forEach(key => {
        if (godData[key].Roles.trim().toLowerCase() === role) {
            gods.push(godData[key]);
        }
    });

    var subgods = gods.filter(function (ind) {
        return user.bans.indexOf(ind) === -1;
    });

    var p = Math.floor(Math.random() * subgods.length);

    message.reply(reply + subgods[p].Name,
        { files: [subgods[p].godIcon_URL] });
}