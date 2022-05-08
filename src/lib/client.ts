import { Client, container } from '@kaname-png/revoltx';

import { stripIndents } from 'common-tags';
import { yellow, red } from 'colorette';
import { envParseBoolean, envParseString } from '@skyra/env-utilities';

export class Nekodex extends Client {
	public constructor() {
		super({
			defaultPrefix: envParseString('CLIENT_PREFIX'),
			hmr: {
				enabled: envParseBoolean('CLIENT_DEBUG')
			},
			logger: {
				displayFunctionName: false,
				minLevel: 'debug'
			}
		});
	}

	public async start(token: string) {
		await this.login(token);
		container.logger.info(
			red(
				`\n\n${stripIndents`

			███▄    █ ▓█████  ██ ▄█▀ ▒█████  ▓█████▄ ▓█████ ▒██   ██▒
			██ ▀█   █ ▓█   ▀  ██▄█▒ ▒██▒  ██▒▒██▀ ██▌▓█   ▀ ▒▒ █ █ ▒░
		   ▓██  ▀█ ██▒▒███   ▓███▄░ ▒██░  ██▒░██   █▌▒███   ░░  █   ░
		   ▓██▒  ▐▌██▒▒▓█  ▄ ▓██ █▄ ▒██   ██░░▓█▄   ▌▒▓█  ▄  ░ █ █ ▒
		   ▒██░   ▓██░░▒████▒▒██▒ █▄░ ████▓▒░░▒████▓ ░▒████▒▒██▒ ▒██▒
		   ░ ▒░   ▒ ▒ ░░ ▒░ ░▒ ▒▒ ▓▒░ ▒░▒░▒░  ▒▒▓  ▒ ░░ ▒░ ░▒▒ ░ ░▓ ░
		   ░ ░░   ░ ▒░ ░ ░  ░░ ░▒ ▒░  ░ ▒ ▒░  ░ ▒  ▒  ░ ░  ░░░   ░▒ ░
			  ░   ░ ░    ░   ░ ░░ ░ ░ ░ ░ ▒   ░ ░  ░    ░    ░    ░
					░    ░  ░░  ░       ░ ░     ░       ░  ░ ░    ░
											  ░
			`}`
			)
		);

		container.logger.info(`╔- ${yellow(container.stores.get('commands').size)} commands`);
		container.logger.info(`║- ${yellow(container.stores.get('listeners').size)} listeners`);
		container.logger.info(`║- ${yellow(container.stores.get('arguments').size)} arguments`);
		container.logger.info(`╚- ${yellow(container.stores.get('preconditions').size)} preconditions`);
		container.logger.info('');
		container.logger.info(`╔- ${yellow(this.x.user!.username)} (${yellow(this.x.user!._id)}) bot started`);
		container.logger.info(`╚- ${yellow(this.x.servers.size)} servers`);
	}
}
