import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import envConfig from '@config';
import { logger } from '@loaders';

interface GoogleUserEmailAndName {
	email: string;
	name: string;
}

export async function getAccessToken(code: string): Promise<string> {
	const {
		baseRedirectURI,
		google: { clientId, clientSecret }
	} = envConfig.oauth;

	const reqConfig: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};

	const url = `https://oauth2.googleapis.com/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${baseRedirectURI}/google/callback`;

	try {
		const {
			data: { access_token: accessToken }
		} = await axios.post(url, reqConfig);
		return accessToken as string;
	} catch (error) {
		const err = error as AxiosError;
		logger.error(err.message);
		logger.error(`${err.response?.status}: ${JSON.stringify(err.response?.data)}`);
		throw err;
	}
}

export async function getEmailAndUsername(accessToken: string): Promise<GoogleUserEmailAndName> {
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
