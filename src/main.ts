import { Nekodex } from './lib/client.js';
import { envParseString, setup } from '@skyra/env-utilities';

const app = async () => {
	setup();
	const client = new Nekodex();
	await client.start(envParseString('CLIENT_TOKEN'));
};

void app();
