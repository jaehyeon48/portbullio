import axios from 'axios';
import envConfig from '@configs/env';

export default async function deleteAvatar() {
	const { serverEndPoint } = envConfig;

	const config = {
		withCredentials: true
	};

	await axios.delete(`${serverEndPoint}/user/avatar`, config);
}
