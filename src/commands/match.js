/**
 * Account Info
 *
 * @author Caden Pepper
 * @version 11/7/20
 */

exports.run = async (client, message, args) => {
    const session = require("../session.js");

    const users = ["Andruww", "UnscathedMaster", "connormrph", "Vineet", "seapepp"];

    for (var i = 0; i < args.length; i++) {
        let x = await Promise.resolve(session.getMatch(client.sessionInfo.session_id, args[i]));
        x.forEach(e => {
            console.log(
                e.hz_player_name +
                    ", " +
                    e.Reference_Name +
                    ", " +
                    e.Kills_Player +
                    ", " +
                    e.Deaths +
                    ", " +
                    e.Assists +
                    ", " +
                    e.Damage_Player +
                    ", " +
                    e.Damage_Bot +
                    ", " +
                    e.Structure_Damage +
                    ", " +
                    e.Damage_Mitigated +
                    ", " +
                    e.Gold_Earned +
                    ", " +
                    e.Gold_Per_Minute +
                    ", " +
                    e.Wards_Placed
            );
        });
        console.log('\n');
        console.log(x);
    }

    //Kills_Player
    //Deaths
    //Damage_Done_Magical/Physical
    //Damage_Mitigated
    //Gold_Earned
    //Gold_Per_Minute
    //Wards_Placed
};
