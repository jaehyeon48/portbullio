import { useQueryClient, useMutation } from 'react-query';
import { Portfolio } from '@prisma/client';
import { deletePortfolio } from '@api/portfolio';
import { portfolioKeys } from '@lib/index';

interface DeletePortfolioArgs {
	portfolioId: number;
	isDefaultPortfolio: boolean;
}

export default function useDeletePortfolio() {
	const queryClient = useQueryClient();

	return useMutation(
		({ portfolioId, isDefaultPortfolio }: DeletePortfolioArgs) =>
			deletePortfolio(portfolioId, isDefaultPortfolio),
		{
			onSuccess: (deletedId, { isDefaultPortfolio }) => {
				queryClient.setQueryData<Portfolio[]>(portfolioKeys.all, prevPortfolios =>
					prevPortfolios ? prevPortfolios.filter(({ id }) => id !== deletedId) : []
				);
				if (isDefaultPortfolio) queryClient.invalidateQueries(portfolioKeys.defaultId());
			}
		}
	);
}
