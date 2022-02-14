import logger from '@lib/winston';
import { prisma } from '@loaders';
import { AuthId, AuthType } from './types';

export default async function isUserExist(authId: AuthId, authType: AuthType): Promise<boolean> {
	try {
		const userInfo = await prisma.userAuthId.findFirst({
			where: {
				authId: String(authId),
				authType
			}
		});

		return !!userInfo;
	} catch (error) {
		logger.error(error);
		throw error;
	}
}
