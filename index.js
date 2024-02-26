import { Client, Collection, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import commandsHandler from './handlers/commandsHandler.js';
import eventsHandler from './handlers/eventsHandler.js';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

commandsHandler(client).then(() => {
	console.log('Commands loaded!');
});

eventsHandler(client).then(() => {
	console.log('Events loaded!');
});

client.login(process.env.BOT_TOKEN);
