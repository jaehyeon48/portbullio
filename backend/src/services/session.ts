import axios, { AxiosError } from 'axios';
import { logger } from '@loaders';
import envConfig from '@config';

interface NewSessionId {
	newSessionId: string;
}

interface CheckSessionResponse {
	data: {
		userId: number;
	};
}

interface CreateSessionResponse {
	data: NewSessionId;
}

export async function createSession(userId: number): Promise<string> {
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

export async function checkSession(sessionId: string): Promise<number> {
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
