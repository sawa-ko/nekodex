import { Command, CommandOptions, PieceContext } from '@kaname-png/revoltx';
import type { Message } from 'revolt.js';

export class ShinobuCommand extends Command {
	public constructor(context: PieceContext, options: CommandOptions) {
		super(context, {
			...options,
			description: 'Shinobu, a very nice person.',
			metadata: { examples: ['shinobu'], usages: ['shinobu'] }
		});
	}

	public async run(message: Message) {
		const source = await this.container.services.naeko.cdnSource('anime_sfw', 'shinobu');
		return message.reply(
			{ content: `[](${source?.path})`, embeds: [{ description: "Shinobu is very pretty, isn't she?", title: source?._id }] },
			false
		);
	}
}
