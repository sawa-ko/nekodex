import { ArgumentError, CommandErrorPayload, CommandEvents, Identifiers, Listener, PieceContext, UserError } from '@kaname-png/revoltx';
import type { ListenerOptions } from '@kaname-png/revoltx';

export class ErrorCommand extends Listener {
	public constructor(context: PieceContext, options: ListenerOptions) {
		super(context, { ...options, event: CommandEvents.CommandError });
	}

	public run(payload: CommandErrorPayload) {
		const error = payload.error as Error;
		if (error instanceof ArgumentError) {
			const prefix = this.container.client.fetchPrefix(payload.message);
			return payload.message.reply(
				[
					`You have entered the argument **${error.argument.name}** incorrectly in the command **${payload.command.name}**:`,
					`\`\`\`\n${error.message}\n\`\`\``,
					`For more information on how to use the command, use the command **${prefix}cmd ${payload.command.name}**.`
				].join('\n'),
				false
			);
		}

		if (error instanceof UserError && error.identifier === Identifiers.ArgsMissing) {
			const prefix = this.container.client.fetchPrefix(payload.message);
			return payload.message.reply(
				[
					`You did not enter the necessary arguments to be able to execute the command **${payload.command.name}**.`,
					`For more information on how to use the command, use the command **${prefix}cmd ${payload.command.name}**.`
				].join('\n'),
				false
			);
		}

		return payload.message.reply(
			[
				`An error occurred while executing the command: \`${payload.command.name}\``,
				`\`\`\`\n${error.message}\n\`\`\``,
				'Please report this error.'
			].join('\n'),
			false
		);
	}
}
