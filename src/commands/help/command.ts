import { Args, Command, CommandOptions, CommandPreConditions, PieceContext } from '@kaname-png/revoltx';
import type { Message } from 'revolt.js';

import { stripIndents } from 'common-tags';

export class CommandInfoCommand extends Command {
	public constructor(context: PieceContext, options: CommandOptions) {
		super(context, {
			...options,
			description: 'Complete information about a command.',
			metadata: { examples: ['command [ command name ]'], usages: ['command hug'] },
			clientPermissions: ['SendEmbeds'],
			aliases: ['cmd']
		});
	}

	public async run(message: Message, args: Args) {
		const botUser = this.container.client.x.user;
		const name = await args.pick('string');
		const command = this.container.stores.get('commands').get(name);

		if (!command) return message.reply('I have not found any command with that name, do I have that command?', false);
		const cooldownCommand = command.preconditions.entries.find(
			(x) => (x as unknown as { name: string }).name === CommandPreConditions.Cooldown
		) as unknown as {
			context: { delay: number; limit: number };
		};

		return message.reply(
			{
				embeds: [
					{
						icon_url: botUser?.generateAvatarURL(),
						title: `${command.category} > ${command.name}`.toUpperCase(),
						colour: '#fff',
						description: [
							this.generateInfoSections('✏ Description', command.description),
							this.generateInfoSections('📁 Category', command.category),
							this.generateInfoSections('🏫 Usages', this.metadata?.usages.map((u, i) => `${i + 1}. ${u}`).join('\n')),
							this.generateInfoSections('🔎 Examples', this.metadata?.examples.map((e, i) => `${i + 1}. ${e}`).join('\n')),
							this.generateInfoSections(
								'⏰ Cooldown',
								cooldownCommand
									? `${cooldownCommand.context.limit} time(s) every ${(cooldownCommand.context.delay ?? 0) / 1e3} second(s)`
									: 'Not available'
							),
							this.generateInfoSections('🤖 Permissions that i need', command.clientPermissions?.join(', ')),
							this.generateInfoSections('👤 Permissions that you need', command.userPermissions?.join(', '))
						].join('\n')
					}
				]
			},
			false
		);
	}

	private generateInfoSections(title: string, content?: string | null) {
		return stripIndents`
		**${title}**
		\`\`\`
		${content ?? 'Not available'}
		\`\`\`
		`;
	}
}
