import axios from 'axios';
import envConfig from '@configs/env';

interface CheckAuthResponse {
	data: {
		userId: number | undefined;
	};
}

export default async function checkAuth(): Promise<number | undefined> {
	const { serverEndPoint } = envConfig;
	try {
		const { data }: CheckAuthResponse = await axios.get(`${serverEndPoint}/auth/check`, {
			withCredentials: true
		});

		return data.userId;
	} catch (error) {
		return undefined;
	}
}
