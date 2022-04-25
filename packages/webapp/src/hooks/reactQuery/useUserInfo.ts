import { useQuery } from 'react-query';
import { userKeys } from '@lib/index';
import { getUserInfo } from '@api/user';

export default function useUserInfo() {
	return useQuery(userKeys.info, getUserInfo, { staleTime: Infinity });
}
