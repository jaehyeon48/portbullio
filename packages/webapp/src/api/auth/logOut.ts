import axios from 'axios';
import envConfig from '@configs/env';

export default async function logOut(): Promise<boolean> {
	const { serverEndPoint } = envConfig;

	try {
		await axios.delete(`${serverEndPoint}/auth/logout`, {
			withCredentials: true
		});
		return true;
	} catch (error) {
		return false;
	}
}
