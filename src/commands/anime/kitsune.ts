import { Command, CommandOptions, PieceContext } from '@kaname-png/revoltx';
import type { Message } from 'revolt.js';

export class KitsuneCommand extends Command {
	public constructor(context: PieceContext, options: CommandOptions) {
		super(context, {
			...options,
			description: 'Kitsune are amazing.',
			metadata: { examples: ['kitsune'], usages: ['kitsune'] }
		});
	}

	public async run(message: Message) {
		const source = await this.container.services.naeko.cdnSource('anime_sfw', 'kitsune');
		return message.reply(
			{ content: `[](${source?.path})`, embeds: [{ description: 'Wow, they looks amazing, right?', title: source?._id }] },
			false
		);
	}
}
