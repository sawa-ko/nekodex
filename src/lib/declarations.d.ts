import type { BooleanString } from '@skyra/env-utilities';

declare module '@skyra/env-utilities' {
	interface Env {
		TOKEN: string;
		DEBUG: BooleanString;
	}
}

export default undefined;
