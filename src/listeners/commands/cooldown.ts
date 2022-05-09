import { ArgumentError, CommandDeniedPayload, CommandEvents, Identifiers, Listener, PieceContext } from '@kaname-png/revoltx';
import type { ListenerOptions } from '@kaname-png/revoltx';

import prettyMilliseconds from 'pretty-ms';

export class DeniedCommand extends Listener {
	public constructor(context: PieceContext, options: ListenerOptions) {
		super(context, { ...options, event: CommandEvents.CommandDenied });
	}

	public run(payload: CommandDeniedPayload) {
		if (payload.error.identifier !== Identifiers.PreconditionCooldown) return;

		const error = payload.error as ArgumentError;
		const { remaining } = error.context as { remaining: number };

		return payload.message.reply(
			[
				'**The command is in cooldown for you**',
				`You have to wait \`${prettyMilliseconds(remaining)}\` before you can use the \`${payload.command.name}\` command again.`
			].join('\n'),
			false
		);
	}
}
