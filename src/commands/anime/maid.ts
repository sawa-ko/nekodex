import { Command, CommandOptions, PieceContext } from '@kaname-png/revoltx';
import type { Message } from 'revolt.js';

export class MaidCommand extends Command {
	public constructor(context: PieceContext, options: CommandOptions) {
		super(context, {
			...options,
			description: 'Maids are part of our lives.',
			metadata: { examples: ['maid'], usages: ['maid'] }
		});
	}

	public async run(message: Message) {
		const source = await this.container.services.naeko.cdnSource('anime_sfw', 'maid');
		return message.reply(
			{ content: `[](${source?.path})`, embeds: [{ description: 'You can never be without maids', title: source?._id }] },
			false
		);
	}
}
