import axios, { AxiosError } from 'axios';
import { logger } from '@loaders';
import envConfig from '@config';

interface CheckSessionResponse {
	data: {
		userId: number;
	};
}

export default async function checkSession(sessionId: string): Promise<number> {
	const { sessionServerURL } = envConfig;
	try {
		const { data }: CheckSessionResponse = await axios.get(`${sessionServerURL}/${sessionId}`);
		return data.userId;
	} catch (error) {
		const err = error as AxiosError;
		logger.error(err.message);
		logger.error(`${err.response?.status}: ${JSON.stringify(err.response?.data)}`);
		throw err;
	}
}
