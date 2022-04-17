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
	redisHost: process.env.REDIS_HOST,
	origin: process.env.ORIGIN,
	sessionIdTTLInSec: Number(process.env.SESSION_ID_TTL_IN_SEC),
	maxCookieAge: process.env.MAX_COOKIE_AGE,
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
