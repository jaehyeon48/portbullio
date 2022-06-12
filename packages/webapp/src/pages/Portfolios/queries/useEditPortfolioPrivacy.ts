import { useQueryClient, useMutation } from 'react-query';
import { Portfolio } from '@prisma/client';
import {
	editPortfolioPrivacy,
	EditPortfolioPrivacyArgs
} from '@api/portfolio/editPortfolioPrivacy';
import { portfolioKeys } from '@lib/reactQuery/queryKeyFactories';
import { updateArray } from '@utils';

export default function useEditPortfolioPrivacy() {
	const queryClient = useQueryClient();

	return useMutation(
		({ portfolioId, newPrivacy }: EditPortfolioPrivacyArgs) =>
			editPortfolioPrivacy({ portfolioId, newPrivacy }),
		{
			onSuccess: updatedPortfolio => {
				queryClient.setQueryData<Portfolio[]>(portfolioKeys.all, prevPortfolios =>
					updateArray(
						prevPortfolios,
						updatedPortfolio,
						element => element.id === updatedPortfolio.id
					)
				);
			}
		}
	);
}
