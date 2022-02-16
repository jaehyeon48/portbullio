import axios from 'axios';
import envConfig from '@configs/env';

export default async function deleteAvatar() {
	const { serverEndPoint } = envConfig;

	const config = {
		withCredentials: true
	};

	try {
		await axios.delete(`${serverEndPoint}/user/avatar`, config);
		return true;
	} catch (error) {
		return false;
	}
}
