import { logger, prisma } from '@loaders';

type AuthType = 'google' | 'naver' | 'kakao';

export async function isUserExist(authId: number | string, authType: AuthType): Promise<boolean> {
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
