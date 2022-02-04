import axios from 'axios';
import envConfig from '@configs/env';

interface CheckAuthResponse {
	data: {
		userId: number | undefined;
	};
}

export default async function checkAuth(): Promise<number | undefined> {
	const { serverEndPoint } = envConfig;

	const { data }: CheckAuthResponse = await axios.get(`${serverEndPoint}/auth/check`, {
		withCredentials: true
	});

	return data.userId;
}
