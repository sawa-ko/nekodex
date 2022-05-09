import { Command, CommandOptions, PieceContext } from '@kaname-png/revoltx';
import type { Message } from 'revolt.js';

import { stripIndents } from 'common-tags';

export class PingCommand extends Command {
	public constructor(context: PieceContext, options: CommandOptions) {
		super(context, { ...options, description: 'Check my speed on the server.', metadata: { examples: ['ping'], usages: ['ping'] } });
	}

	public async run(message: Message) {
		const repliedMessage = await message.reply('⏲️ ...', false);
		return repliedMessage?.edit({
			content: stripIndents`
			🏓 My ping with **you** was \`${repliedMessage.createdAt - message.createdAt}ms\` and with **Revolt** \`${this.container.client.ping}ms\`.
			`
		});
	}
}
