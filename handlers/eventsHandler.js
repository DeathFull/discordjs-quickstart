import path from 'node:path';
import fs from 'node:fs';

async function eventsHandler(client) {
	const eventsPath = path.join(process.cwd(), 'events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const filePath = path.join('file://', eventsPath, file);
		const event = await import(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
}

export default eventsHandler;