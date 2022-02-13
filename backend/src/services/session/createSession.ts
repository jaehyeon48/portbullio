import axios, { AxiosError } from 'axios';
import { logger } from '@loaders';
import envConfig from '@config';

interface NewSessionId {
	newSessionId: string;
}

interface CreateSessionResponse {
	data: NewSessionId;
}

export default async function createSession(userId: number): Promise<string> {
	const { sessionServerURL } = envConfig;
	try {
		const { data }: CreateSessionResponse = await axios.post(`${sessionServerURL}/${userId}`);

		return data.newSessionId;
	} catch (error) {
		const err = error as AxiosError;
		logger.error(err.message);
		logger.error(`${err.response?.status}: ${JSON.stringify(err.response?.data)}`);
		throw err;
	}
}
