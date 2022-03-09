import { useQueryClient, useMutation } from 'react-query';
import { Portfolio, PortfolioPrivacy } from '@prisma/client';
import { editPortfolioPrivacy } from '@api/portfolio';
import { updateArray } from '@utils';
import { portfolioKeys } from '@lib/index';

interface EditPortfolioPrivacyArgs {
	portfolioId: number;
	newPrivacy: PortfolioPrivacy;
}

export default function useEditPortfolioPrivacy() {
	const queryClient = useQueryClient();

	return useMutation(
		({ portfolioId, newPrivacy }: EditPortfolioPrivacyArgs) =>
			editPortfolioPrivacy(portfolioId, newPrivacy),
		{
			onSuccess: res => {
				queryClient.setQueryData<Portfolio[]>(portfolioKeys.all, data =>
					updateArray(data, res, element => element.id === res.id)
				);
			}
		}
	);
}
