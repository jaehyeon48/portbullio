import logger from '@lib/winston';
import prisma from '@lib/prisma';

export default async function getUserId(email: string): Promise<number> {
	try {
		const { id: userId } = (await prisma.user.findFirst({
			where: { email }
		})) ?? { id: -1 };

		return userId;
	} catch (error) {
		logger.error(error);
		throw error;
	}
}
