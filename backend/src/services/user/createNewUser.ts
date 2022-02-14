import logger from '@lib/winston';
import { prisma } from '@loaders';
import createNewUserAuthId from './createNewUserAuthId';
import { AuthId, AuthType } from './types';

export interface NewUserProps {
	authId: AuthId;
	authType: AuthType;
	username: string;
	currency?: string;
}

export default async function createNewUser({
	authId,
	authType,
	username,
	currency = 'krw'
}: NewUserProps): Promise<number> {
	try {
		const { id: newUserId } = await prisma.user.create({
			data: {
				username,
				authType,
				currency
			}
		});

		await createNewUserAuthId({ authId, authType, userId: newUserId });
		return newUserId;
	} catch (error) {
		logger.error(error);
		throw error;
	}
}
