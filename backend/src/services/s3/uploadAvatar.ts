import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { s3Client } from '@lib/s3';
import envConfig from '@config';

export default async function uploadAvatarToS3(fileName: string, fileData: Buffer) {
	const uploadParams: PutObjectCommandInput = {
		Bucket: envConfig.aws.bucketName,
		Key: fileName,
		Body: fileData,
		ContentEncoding: 'base64'
	};

	try {
		await s3Client.send(new PutObjectCommand(uploadParams));
		return 0;
	} catch (error) {
		return -1;
	}
}
