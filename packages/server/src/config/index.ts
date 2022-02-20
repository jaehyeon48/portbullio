import dotenv from 'dotenv';
import logger from '@lib/winston';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';

const envFound = dotenv.config();
if (envFound.error) {
	logger.error('Could not find .env file');
	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
	port: Number(process.env.PORT),
	origin: process.env.ORIGIN,
	sessionServerURL: process.env.SESSION_SERVER_URL,
	oauth: {
		baseRedirectURI: process.env.BASE_REDIRECT_URI,
		google: {
			clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
			clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
			postmanSecret: process.env.GOOGLE_POSTMAN_SECRET
		}
	},
	aws: {
		identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
		region: process.env.AWS_REGION,
		bucketName: process.env.AWS_S3_BUCKET_NAME
	}
};
