import { useQuery } from 'react-query';
import { User as UserIcon } from '@components/index';
import { getAvatar } from '@api/user';
import * as Style from './styles';

export default function ProfileThumbnail() {
	const { data: avatarURL, isLoading } = useQuery('avatarUrl', getAvatar, { staleTime: Infinity });

	return (
		<Style.Container>
			{isLoading || !avatarURL ? (
				<UserIcon width={36} height={36} />
			) : (
				<img src={avatarURL} alt="user avatar" />
			)}
		</Style.Container>
	);
}
