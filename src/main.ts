import { Nekodex } from './lib/client';
import { envParseString, setup } from '@skyra/env-utilities';
import { container } from '@kaname-png/revoltx';

const app = async () => {
	setup();
	const client = new Nekodex();
	await client.start(envParseString('TOKEN'));
	console.log(container.stores.get('commands').paths);
};

void app();
