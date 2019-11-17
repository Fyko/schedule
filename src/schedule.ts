import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '..', '.env') });

import Client from './bot/structure/Client';

(() => {
	const { CONSUMER_KEY, CONSUMER_KEY_SECRET, API_KEY, API_KEY_SECRET } = process.env;
	console.dir({ CONSUMER_KEY, CONSUMER_KEY_SECRET, API_KEY, API_KEY_SECRET });

	if ([CONSUMER_KEY, CONSUMER_KEY_SECRET, API_KEY, API_KEY_SECRET].includes(undefined)) {
		console.error('All 4 Twitter tokens are not provided!');
		process.exit(1);
	}

	const client = new Client();

	return client.init();
})();
