import { Command, CommandOptions, PieceContext } from '@kaname-png/revoltx';
import type { Message } from 'revolt.js';

export class MeguminCommand extends Command {
	public constructor(context: PieceContext, options: CommandOptions) {
		super(context, {
			...options,
			aliases: ['megu'],
			description: 'Beware of Megumin.',
			metadata: { examples: ['megumin'], usages: ['megumin'] }
		});
	}

	public async run(message: Message) {
		const source = await this.container.services.naeko.cdnSource('anime_sfw', 'megumin');
		return message.reply({ content: `[](${source?.path})`, embeds: [{ description: 'Explosion!', title: source?._id }] }, false);
	}
}
