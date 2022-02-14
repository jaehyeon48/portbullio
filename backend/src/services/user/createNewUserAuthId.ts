import logger from '@lib/winston';
import { prisma } from '@loaders';
import { AuthId, AuthType } from './types';

export interface NewUserAuthIdProps {
	authId: AuthId;
	authType: AuthType;
	userId: number;
}

export default async function createNewUserAuthId({
	authId,
	authType,
	userId
}: NewUserAuthIdProps) {
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
