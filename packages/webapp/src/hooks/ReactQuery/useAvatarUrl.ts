import { useQuery } from 'react-query';
import getAvatar from '@api/user/getAvatar';
import { avatarKeys } from '@lib/reactQuery/queryKeyFactories';

export default function useAvatarUrl() {
	return useQuery(avatarKeys.url, getAvatar, { staleTime: Infinity });
}
