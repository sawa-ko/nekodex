import { Args, Command, CommandOptions, PieceContext } from '@kaname-png/revoltx';
import type { Message } from 'revolt.js';

import { stripIndents } from 'common-tags';

export class HelpCommand extends Command {
	public constructor(context: PieceContext, options: CommandOptions) {
		super(context, {
			...options,
			description: 'General help about my commands and me.',
			metadata: { examples: ['help'], usages: ['help'] },
			clientPermissions: ['SendEmbeds']
		});
	}

	public async run(message: Message, args: Args) {
		const botUser = this.container.client.x.user;
		const category = await args.pick('string').catch(() => null);

		if (!category) {
			return message.reply(
				{
					embeds: [
						{
							icon_url: botUser?.generateAvatarURL(),
							title: `Help | ${botUser?.username}`,
							description: [
								`Hi, I'm ${botUser?.username} and I'm a **Neko Bot** with **Roleplay** commands for fun.`,
								'You can invite me to your server and use my commands with your friends on your server, I am always active for you.',
								stripIndents`
								I show you my available command categories:
								For now I have **${this.container.stores.get('commands').categories.length}** categories and **${this.store.size}** commands.
								`,
								`To view the commands of a category use the command: \`${this.container.client.defaultPrefix}help [ category name ]\``,
								stripIndents`\`\`\`
								${this.container.stores
									.get('commands')
									.categories.map((c, i) => `${i + 1}. ${c}`)
									.join('\n')}
								\`\`\``
							].join('\n\n'),
							colour: '#fff'
						}
					]
				},
				false
			);
		}

		const page = await args.pick('number', { minimum: 1 }).catch(() => 1);
		const commands = this.paginateCategoryCommands(category, page);
		return message.reply(
			{
				embeds: [
					{
						icon_url: botUser?.generateAvatarURL(),
						title: `${category.toUpperCase()} | Page ${page}/${Math.ceil(this.store.size / 10)}`,
						description: commands.join('\n')
					}
				]
			},
			false
		);
	}

	private paginateCategoryCommands(name: string, page: number) {
		return [...this.container.stores.get('commands').values()]
			.filter(({ category }) => category === name)
			.slice((page - 1) * 10, page * 10)
			.map(
				(c, i) => stripIndents`
			${i + 1}. \`${this.container.client.defaultPrefix}${c.name}\`
			*${c.description}*
			`
			);
	}
}
