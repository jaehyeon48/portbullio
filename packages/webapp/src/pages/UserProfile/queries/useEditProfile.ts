import { useQueryClient, useMutation } from 'react-query';
import { editUserProfile, EditUserProfileArgs } from '@api/user/editUserProfile';
import { userKeys } from '@lib/reactQuery/queryKeyFactories';

export default function useEditProfile() {
	const queryClient = useQueryClient();

	return useMutation(
		({ username, bio, location }: EditUserProfileArgs) =>
			editUserProfile({ username, bio, location }),
		{
			onSuccess: updatedPortfolio => {
				queryClient.setQueryData(userKeys.profile, updatedPortfolio);
			}
		}
	);
}
