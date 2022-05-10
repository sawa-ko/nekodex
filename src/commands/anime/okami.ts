import { Command, CommandOptions, PieceContext } from '@kaname-png/revoltx';
import type { Message } from 'revolt.js';

export class MaidCommand extends Command {
	public constructor(context: PieceContext, options: CommandOptions) {
		super(context, {
			...options,
			description: 'Okami always looks great.',
			metadata: { examples: ['okami'], usages: ['okami'] }
		});
	}

	public async run(message: Message) {
		const source = await this.container.services.naeko.cdnSource('anime_sfw', 'okami');
		return message.reply({ content: `[](${source?.path})`, embeds: [{ description: 'It looks very exceptional!', title: source?._id }] }, false);
	}
}
