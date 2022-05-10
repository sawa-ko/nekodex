import { Command, CommandOptions, PieceContext } from '@kaname-png/revoltx';
import type { Message } from 'revolt.js';

export class HoloCommand extends Command {
	public constructor(context: PieceContext, options: CommandOptions) {
		super(context, {
			...options,
			description: 'One more pretty girl',
			metadata: { examples: ['holo'], usages: ['holo'] }
		});
	}

	public async run(message: Message) {
		const source = await this.container.services.naeko.cdnSource('anime_sfw', 'holo');
		return message.reply({ content: `[](${source?.path})`, embeds: [{ description: 'Holo is a beautiful girl!', title: source?._id }] }, false);
	}
}
