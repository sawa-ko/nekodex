import { Command, CommandOptions } from '@kaname-png/revoltx';
import type { PieceContext } from '@sapphire/pieces';
import type { Message } from 'revolt.js';

export class PingCommand extends Command {
	public constructor(context: PieceContext, options: CommandOptions) {
		super(context, { ...options });
	}

	public async run(message: Message) {
		const repliedMessage = await message.reply('⏲️ ...');
		return repliedMessage?.edit({ content: `🏓 My ping with you was \`${repliedMessage.createdAt - message.createdAt}ms\`.` });
	}
}
