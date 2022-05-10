import { Command, CommandOptions, PieceContext } from '@kaname-png/revoltx';
import type { Message } from 'revolt.js';

export class AwooCommand extends Command {
	public constructor(context: PieceContext, options: CommandOptions) {
		super(context, {
			...options,
			description: 'Awoo!!',
			metadata: { examples: ['awoo'], usages: ['awoo'] }
		});
	}

	public async run(message: Message) {
		const source = await this.container.services.naeko.cdnSource('anime_sfw', 'awoo');
		return message.reply({ content: `[](${source?.path})`, embeds: [{ description: 'Awoo!', title: source?._id }] }, false);
	}
}
