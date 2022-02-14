import axios from 'axios';
import envConfig from '@configs/env';

interface UploadAvatarRes {
	data: {
		uploadedFileName: string;
	};
}

export default async function uploadAvatar(avatarFile: File) {
	const { serverEndPoint } = envConfig;

	const config = {
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		withCredentials: true
	};

	try {
		const avatarData = new FormData();
		avatarData.append('avatar', avatarFile);

		const { data }: UploadAvatarRes = await axios.put(
			`${serverEndPoint}/user/avatar`,
			avatarData,
			config
		);

		return data.uploadedFileName;
	} catch (error) {
		return '';
	}
}
