import { Command, CommandOptions, PieceContext } from '@kaname-png/revoltx';
import type { Message } from 'revolt.js';

export class NekoCommand extends Command {
	public constructor(context: PieceContext, options: CommandOptions) {
		super(context, {
			...options,
			description: 'They are my friends, you can see them.',
			metadata: { examples: ['neko'], usages: ['neko'] }
		});
	}

	public async run(message: Message) {
		const source = await this.container.services.naeko.cdnSource('anime_sfw', 'neko');
		return message.reply({ content: `[](${source?.path})`, embeds: [{ description: 'Meet a friend of mine', title: source?._id }] }, false);
	}
}
