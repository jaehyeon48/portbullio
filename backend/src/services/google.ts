import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import envConfig from '@config';
import { logger } from '@loaders';

interface GoogleUserProfile {
	id: string;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	locale: string;
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
		logger.error(`${err.response?.status}: ${JSON.stringify(err.response?.data)}`);
		throw err;
	}
}

export async function getUserProfile(accessToken: string): Promise<GoogleUserProfile> {
	try {
		const { data } = await axios.get(
			`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
		);

		return data;
	} catch (error) {
		const err = error as AxiosError;
		logger.error(`${err.response?.status}: ${JSON.stringify(err.response?.data)}`);
		throw err;
	}
}
