import { container } from '@kaname-png/revoltx';
import got from 'got';

export const uploadFiles = async (...urls: string[]) => {
	return (
		await Promise.all(
			urls.map(async (url) => {
				const reqFile = await got.get(url, { responseType: 'buffer' }).catch(() => null);
				if (!reqFile) return null;

				const cdn = await container.services.revolt.autumn('attachments', reqFile.body);
				if (!cdn) return null;

				return cdn;
			})
		)
	).filter((i) => i !== null);
};
