import axios from 'axios';
import envConfig from '@configs/env';

interface CheckAuthResponse {
	data: {
		logOutResult: number | undefined;
	};
}

export default async function logOut(): Promise<number | undefined> {
	const { serverEndPoint } = envConfig;

	try {
		const { data }: CheckAuthResponse = await axios.delete(`${serverEndPoint}/auth/logout`, {
			withCredentials: true
		});
		return data.logOutResult;
	} catch (error) {
		return -1;
	}
}
