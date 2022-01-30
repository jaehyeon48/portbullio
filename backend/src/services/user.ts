import { logger, prisma } from '@loaders';

type AuthType = 'google' | 'naver' | 'kakao';
type AuthId = number | string;

interface NewUserProps {
	authId: AuthId;
	authType: AuthType;
	username: string;
	currency?: string;
}

interface NewUserAuthIdProps {
	authId: AuthId;
	authType: AuthType;
	userId: number;
}

export async function isUserExist(authId: AuthId, authType: AuthType): Promise<boolean> {
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

export async function createNewUser({
	authId,
	authType,
	username,
	currency = 'krw'
}: NewUserProps) {
	try {
		const { id: newUserId } = await prisma.user.create({
			data: {
				username,
				authType,
				currency
			}
		});

		await createNewUserAuthId({ authId, authType, userId: newUserId });
	} catch (error) {
		logger.error(error);
		throw error;
	}
}

async function createNewUserAuthId({ authId, authType, userId }: NewUserAuthIdProps) {
	try {
		await prisma.userAuthId.create({
			data: {
				authId: String(authId),
				authType,
				userId
			}
		});
	} catch (error) {
		logger.error(error);
		throw error;
	}
}
