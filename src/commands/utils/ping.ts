import { Command, CommandOptions, PieceContext } from '@kaname-png/revoltx';
import { stripIndents } from 'common-tags';
import type { Message } from 'revolt.js';

export class PingCommand extends Command {
	public constructor(context: PieceContext, options: CommandOptions) {
		super(context, { ...options });
	}

	public async run(message: Message) {
		const repliedMessage = await message.reply('⏲️ ...');
		return repliedMessage?.edit({
			content: stripIndents`
			🏓 My ping with **you was** \`${repliedMessage.createdAt - message.createdAt}ms\` and with **Revolt** \`${this.container.client.ping}ms\`.
			`
		});
	}
}
