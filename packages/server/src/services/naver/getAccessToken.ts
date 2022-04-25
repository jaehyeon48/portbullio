import axios, { AxiosRequestConfig } from 'axios';
import envConfig from '@config';

interface GetAccessTokenRes {
	data: {
		access_token: string;
	};
}

export default async function getAccessToken(code: string, state: string) {
	const {
		naver: { clientId, secret, accessTokenBaseUrl }
	} = envConfig.oauth;

	const reqConfig: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};

	const url = `${accessTokenBaseUrl}?client_id=${clientId}&client_secret=${secret}&code=${code}&grant_type=authorization_code&state=${state}`;

	const {
		data: { access_token: accessToken }
	}: GetAccessTokenRes = await axios.post(url, reqConfig);

	return accessToken;
}
