import type { BooleanString } from '@skyra/env-utilities';

import type { NaekoService, RevoltService } from './services';

declare module '@skyra/env-utilities' {
	interface Env {
		CLIENT_TOKEN: string;
		CLIENT_DEBUG: BooleanString;
		CLIENT_PREFIX: string;

		CDN_API_KEY: string;
	}
}

declare module '@kaname-png/revoltx' {
	interface CommandMetadata {
		usages: string[];
		examples: string[];
	}
}

declare module '@sapphire/pieces' {
	interface Container {
		services: {
			naeko: NaekoService;
			revolt: RevoltService;
		};
	}
}
