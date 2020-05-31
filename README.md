# DiscordBot
Discord bot with the SMITE API, currently unnamed.

Used to implement some features to use with SMITE.

# !pick Command
-----------------------------------
* !pick [class] [SMITE username (optional)]

Picks a SMITE God based on given class, if the user enters their SMITE username, it will give weight to picks depending on when the God was last played based on match history, worshipper count, and more.

> Potential Features: Pick by role, pantheon, damage type

# !ban Command
------------------------------------------
* !ban [SMITE God]

Adds given SMITE God to users' ban list. This character can no longer be randomly selected in the !pick command.

* !ban list

Lists the users' banned God list.

* !ban remove [SMITE God]

Removes the SMITE God from users' ban list.

> Potential Features: Wider blanket bans, ban Gods with zero worshippers, ban max rank Gods, etc.

# Future features
----------------
* User statistics (Match history, God stats, etc.)
* Challenge feature (Gives match type, God to play, etc.)
* Build guide/Random build (Gives build for a God, makes random build for a God, different settings can be give like damage, tank)
* Team compositions (Playing with multiple people, makes random team composition)
