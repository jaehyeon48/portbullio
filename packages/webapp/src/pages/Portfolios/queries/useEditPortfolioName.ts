import { useQueryClient, useMutation } from 'react-query';
import { Portfolio } from '@prisma/client';
import { editPortfolioName, EditPortfolioNameArgs } from '@api/portfolio/editPortfolioName';
import { portfolioKeys } from '@lib/reactQuery/queryKeyFactories';
import { updateArray } from '@utils';

export default function useEditPortfolioName() {
	const queryClient = useQueryClient();

	return useMutation(
		({ portfolioId, newPortfolioName }: EditPortfolioNameArgs) =>
			editPortfolioName({ portfolioId, newPortfolioName }),
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
