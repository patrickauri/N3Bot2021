// Perform Setup
const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const token = process.env.TOKEN;
const roles = require('./roles.json');

// Get Role ID
const GetRoleID = (roleName) => {
	let found = false;
	let result;
	for (let i = 0; i < roles.length && found === false; i++) {
		if (roles[i][0] === roleName) {
			result = roles[i][1];
			found = true;
		}
	}
	return found === true ? result : null;
};

// Get Role Name
const GetRoleName = (msg, role) => {
	return msg.guild.roles.cache.find((r) => r.id === GetRoleID(role)).name;
};

// Add Role
const AddRoleOLD = (user, role) => {
	if (user.roles.cache.some((r) => r.id === GetRoleID(role))) {
		RemoveRole(msg, role, mute);
	} else {
		user.roles.add(GetRoleID(role));
		const roleName = msg.guild.roles.cache.find((r) => r.id === GetRoleID(role)).name;
		if (!mute) {
			const reply = `You've been given the role: **${roleName}**`;
			msg.channel.send(reply);
		}
		console.log(`Added Role ${roleName} to user: ${msg.member.user.username}`);
	}
};

/* const AddRole = (user, role) {
    if (user.roles.cache.some((r) => r.id !== GetRoleID(role)))
    user.roles.add
}*/

// Client On Ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Client On Message Reaction Add
client.on('messageReactionAdd', async (reaction, user) => {
    const member = reaction.message.guild.members.cache.find(member => member.id === user.id);

    if (reaction.partial)
    {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error(`Couldn't fetch reaction message (${error})`);
            return;
        }
    }

    try {
        const r = roles.find(e => e[0] === reaction.emoji.name);
        member.roles.add(r[1]);
        console.log(`Added role ${r[0]} to ${member.displayName}`);
    } catch {
        e => console.error(e)
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    const member = reaction.message.guild.members.cache.find(member => member.id === user.id);

    if (reaction.partial)
    {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error(`Couldn't fetch reaction message (${error})`);
            return;
        }
    }

    try {
        const r = roles.find(e => e[0] === reaction.emoji.name);
        member.roles.remove(r[1]);
        console.log(`Removed role ${r[0]} to ${member.displayName}`);
    } catch {
        e => console.error(e)
    }
});

// Log in to Discord
client.login(token);