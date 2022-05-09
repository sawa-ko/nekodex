import { ArgumentError, CommandDeniedPayload, CommandEvents, Identifiers, Listener, PieceContext } from '@kaname-png/revoltx';
import type { ListenerOptions } from '@kaname-png/revoltx';

export class DeniedCommand extends Listener {
	public constructor(context: PieceContext, options: ListenerOptions) {
		super(context, { ...options, event: CommandEvents.CommandDenied });
	}

	public run(payload: CommandDeniedPayload) {
		if (payload.error.identifier === Identifiers.PreconditionCooldown) return;

		const error = payload.error as ArgumentError;
		return payload.message.reply(
			[`The command has been denied, and it is for the following reason:`, `\`\`\`\n${error.message}\n\`\`\``].join('\n'),
			false
		);
	}
}
