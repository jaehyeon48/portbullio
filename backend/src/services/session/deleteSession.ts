import axios, { AxiosError } from 'axios';
import logger from '@lib/winston';
import envConfig from '@config';

interface DeleteSessionResponse {
	data: {
		deleteResult: boolean;
	};
}

export default async function deleteSession(sessionId: string): Promise<boolean> {
	const { sessionServerURL } = envConfig;
	try {
		const { data }: DeleteSessionResponse = await axios.delete(`${sessionServerURL}/${sessionId}`);
		return data.deleteResult;
	} catch (error) {
		const err = error as AxiosError;
		logger.error(err.message);
		logger.error(`${err.response?.status}: ${JSON.stringify(err.response?.data)}`);
		throw err;
	}
}
