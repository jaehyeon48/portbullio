import axios, { AxiosError } from 'axios';
import { logger } from '@loaders';

interface GoogleUserEmailAndName {
	email: string;
	name: string;
}

export default async function getEmailAndUsername(
	accessToken: string
): Promise<GoogleUserEmailAndName> {
	try {
		const { data } = await axios.get(
			`https://www.googleapis.com/oauth2/v2/userinfo?fields=email,name&access_token=${accessToken}`
		);

		return data;
	} catch (error) {
		const err = error as AxiosError;
		logger.error(err.message);
		logger.error(`${err.response?.status}: ${JSON.stringify(err.response?.data)}`);
		throw err;
	}
}
