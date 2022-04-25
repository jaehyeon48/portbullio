import axios, { AxiosRequestConfig } from 'axios';
import envConfig from '@config';

interface GetEmailAndUsernameRes {
	data: {
		resultcode: string;
		message: string;
		response: {
			id: string;
			email: string;
			name: string;
		};
	};
}

const {
	oauth: {
		naver: { queryInfoBaseUrl }
	}
} = envConfig;

export default async function getEmailAndUsername(accessToken: string) {
	const reqConfig: AxiosRequestConfig = {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	};

	const {
		data: {
			response: { email, name }
		}
	}: GetEmailAndUsernameRes = await axios.get(queryInfoBaseUrl as string, reqConfig);

	return { email, username: name };
}
