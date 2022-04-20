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
	iexCloudApiKey: process.env.IEX_CLOUD_API_KEY,
	iexCloudBaseUrl: process.env.IEX_CLOUD_BASE_URL,
	fmpApiKey: process.env.FMP_API_KEY
};
