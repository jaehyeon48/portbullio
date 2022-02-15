import axios from 'axios';
import envConfig from '@configs/env';

interface CheckAuthResponse {
	data: {
		logOutResult: boolean;
	};
}

export default async function logOut(): Promise<boolean> {
	const { serverEndPoint } = envConfig;

	try {
		const { data }: CheckAuthResponse = await axios.delete(`${serverEndPoint}/auth/logout`, {
			withCredentials: true
		});
		return data.logOutResult;
	} catch (error) {
		return false;
	}
}
