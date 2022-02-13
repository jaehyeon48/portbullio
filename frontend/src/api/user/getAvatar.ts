import axios from 'axios';
import envConfig from '@configs/env';

type AvatarURL = string | null | undefined;

interface GetAvatarResponse {
	data: {
		avatarURL: AvatarURL;
	};
}

export default async function getAvatar(): Promise<AvatarURL> {
	const { serverEndPoint } = envConfig;
	try {
		const {
			data: { avatarURL }
		}: GetAvatarResponse = await axios.get(`${serverEndPoint}/user/avatar`, {
			withCredentials: true
		});

		return avatarURL;
	} catch (error) {
		return null;
	}
}
