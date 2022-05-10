import { FormData, File } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';
import got from 'got';

export class RevoltService {
	public readonly autumnBaseUrl = 'https://autumn.revolt.chat';

	public async autumn(tag: string, file: Buffer, filename = 'filename') {
		const fileMetadata = await fileTypeFromBuffer(file);
		if (!fileMetadata) return null;

		const body = new FormData();
		body.set('file', new File(file, `${filename}.${fileMetadata.ext}`));

		try {
			const request = await got.post<{ id: string }>(`${this.autumnBaseUrl}/${tag}`, { body, responseType: 'json' });
			return {
				id: request.body.id,
				url: `${this.autumnBaseUrl}/${tag}/${request.body.id}/${filename}.${fileMetadata.ext}`
			};
		} catch (_: unknown) {
			return null;
		}
	}
}
