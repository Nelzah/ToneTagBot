require('dotenv').config();
const tagList = require('./toneTags.json');
const Discord = require('discord.js');
const client = new Discord.Client({
	disableEveryone: true,
	intents: ['GUILDS', 'GUILD_MESSAGES'],
});

client.once('ready', () => {
	console.log('Client is up and ready :3');
});

client.on('messageCreate', message => {
	let tags = [...new Set(message.content.match(/\/\w{0,3}\w/g))] || [];
	let list = [];

	if (!tags) return;

	tags.forEach(tag => {
		tagList[tag] && list.push(tagList[tag]);
	});

	list.length > 0 && message.reply(`---- Tone Tags ----\n${list.map(v => `**${v}**`).join('\n')}`);
});

client.login(process.env.TOKEN);
