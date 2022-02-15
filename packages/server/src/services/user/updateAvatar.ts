import { randomUUID } from 'crypto';
import { uploadAvatarToS3 } from '@services/s3';
import { AvatarMIMEType } from '@types';
import { AVATAR_MIME_TYPES } from '@portbullio/shared/src/constants/index';
import prisma from '@lib/prisma';

export default async function updateAvatar(
	mimetype: AvatarMIMEType,
	userId: number,
	fileData: string
) {
	const fileName = `${randomUUID()}.${AVATAR_MIME_TYPES[mimetype]}`;
	const uploadResult = await uploadAvatarToS3(fileName, Buffer.from(fileData, 'base64'));
	if (uploadResult === -1) {
		throw new Error(`There was an error uploading userId ${userId}'s avatar`);
	}

	await prisma.user.update({
		where: { id: userId },
		data: { avatar: fileName }
	});

	return fileName;
}
