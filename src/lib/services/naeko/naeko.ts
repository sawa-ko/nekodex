import type { ICDNSource } from './types.js';
import got from 'got';

export class NaekoService {
	public readonly baseUrl = 'https://api.naeko.moe';

	public constructor(private readonly _apiKey: string) {}

	public async cdnSource(category: string, type: string) {
		try {
			const request = await got.get<ICDNSource>(`${this.baseUrl}/cdn/${category}/${type}`, {
				headers: { 'x-api-key': this._apiKey },
				responseType: 'json'
			});
			return request.body.data;
		} catch (_: unknown) {
			return null;
		}
	}
}
