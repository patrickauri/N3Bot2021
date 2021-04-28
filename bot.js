// Perform Setup
const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const token = process.env.TOKEN;


// Client On Ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Log in to Discord
client.login(token);