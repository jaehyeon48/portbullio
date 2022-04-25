import axios from 'axios';
import { UserInfo } from '@portbullio/shared/src/types';
import envConfig from '@configs/env';

interface GetAvatarResponse {
	data: UserInfo;
}

export default async function getAvatar() {
	const { apiServerUrl } = envConfig;
	try {
		const { data }: GetAvatarResponse = await axios.get(`${apiServerUrl}/user/info`, {
			withCredentials: true
		});

		return data;
	} catch (error) {
		return null;
	}
}
