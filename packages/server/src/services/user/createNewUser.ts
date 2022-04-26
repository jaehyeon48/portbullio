import prisma from '@lib/prisma';
import { AuthType } from './types';

export interface NewUserProps {
	authType: AuthType;
	username: string;
	email: string;
	currency?: string;
}

export default async function createNewUser({
	authType,
	username,
	email,
	currency = 'krw'
}: NewUserProps): Promise<number> {
	const { id: newUserId } = await prisma.user.create({
		data: {
			username,
			email,
			authType,
			currency
		}
	});

	return newUserId;
}
