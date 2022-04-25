import logger from '@lib/winston';
import prisma from '@lib/prisma';

export default async function isUserExist(email: string): Promise<boolean> {
	try {
		const userInfo = await prisma.user.findFirst({
			where: { email }
		});

		return !!userInfo;
	} catch (error) {
		logger.error(error);
		throw error;
	}
}
