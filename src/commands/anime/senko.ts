import { Command, CommandOptions, PieceContext } from '@kaname-png/revoltx';
import type { Message } from 'revolt.js';

export class MaidCommand extends Command {
	public constructor(context: PieceContext, options: CommandOptions) {
		super(context, {
			...options,
			description: 'Little Senko.',
			metadata: { examples: ['senko'], usages: ['senko'] }
		});
	}

	public async run(message: Message) {
		const source = await this.container.services.naeko.cdnSource('anime_sfw', 'senko');
		return message.reply({ content: `[](${source?.path})`, embeds: [{ description: 'Aww, she is so cute!', title: source?._id }] }, false);
	}
}
