import { Command, CommandOptions, PieceContext } from '@kaname-png/revoltx';
import type { Message } from 'revolt.js';

export class WaifuCommand extends Command {
	public constructor(context: PieceContext, options: CommandOptions) {
		super(context, {
			...options,
			aliases: ['waifupls'],
			description: 'Summon a beautiful Waifu in the chat.',
			metadata: { examples: ['waifu'], usages: ['waifu'] }
		});
	}

	public async run(message: Message) {
		const source = await this.container.services.naeko.cdnSource('anime_sfw', 'waifu');
		return message.reply({ content: `[](${source?.path})`, embeds: [{ description: "Look, she's a cute waifu", title: source?._id }] }, false);
	}
}
