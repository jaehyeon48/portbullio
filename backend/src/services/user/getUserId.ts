import { logger, prisma } from '@loaders';
import { AuthId, AuthType } from './types';

export default async function getUserId(authId: AuthId, authType: AuthType): Promise<number> {
	try {
		const { userId } = (await prisma.userAuthId.findFirst({
			where: {
				authId: String(authId),
				authType
			}
		})) ?? { userId: -1 };

		return userId;
	} catch (error) {
		logger.error(error);
		throw error;
	}
}
