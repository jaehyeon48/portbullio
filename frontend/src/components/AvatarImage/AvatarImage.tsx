import { useQuery } from 'react-query';
import envConfig from '@configs/env';
import { User as UserIcon } from '@components/Icon';
import { getAvatar } from '@api/user';
import Image from './styles';

interface Props {
	userIconWidth: number;
	userIconHeight: number;
}

export default function AvatarImage({ userIconWidth, userIconHeight }: Props) {
	const { data: avatarURL, isLoading } = useQuery('avatarUrl', getAvatar, { staleTime: Infinity });

	return isLoading || !avatarURL ? (
		<UserIcon width={userIconWidth} height={userIconHeight} />
	) : (
		<Image src={`${envConfig.avatarImageEndPoint}/${avatarURL}`} alt="user avatar" />
	);
}
