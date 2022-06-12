import { useQuery } from 'react-query';
import getUserProfile from '@api/user/getUserProfile';
import { userKeys } from '@lib/reactQuery/queryKeyFactories';

export default function useUserProfile() {
	return useQuery(userKeys.profile, getUserProfile, { staleTime: Infinity });
}
