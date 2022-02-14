import logger from '@lib/winston';
import { prisma } from '@loaders';

type AvatarURL = string | null | undefined;

export default async function getAvatar(userId: number): Promise<AvatarURL> {
	try {
		const user = await prisma.user.findFirst({
			where: { id: userId },
			select: { avatar: true }
		});

		return user?.avatar;
	} catch (error) {
		logger.error(error);
		throw error;
	}
}
