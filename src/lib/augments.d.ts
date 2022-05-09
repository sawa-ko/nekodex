import type { BooleanString } from '@skyra/env-utilities';

declare module '@skyra/env-utilities' {
	interface Env {
		CLIENT_TOKEN: string;
		CLIENT_DEBUG: BooleanString;
		CLIENT_PREFIX: string;
	}
}

declare module '@kaname-png/revoltx' {
	interface CommandMetadataObject {
		usages: string[];
		examples: string[];
	}
}

export default undefined;
