import dotenv from 'dotenv';
import { logger } from '@loaders';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';

const envFound = dotenv.config();
if (envFound.error) {
	logger.error('Could not find .env file');
	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
	port: Number(process.env.PORT),
	origin: process.env.ORIGIN,
	oauth: {
		baseRedirectURI: process.env.BASE_REDIRECT_URI,
		google: {
			clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
			clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET
		}
	}
};
