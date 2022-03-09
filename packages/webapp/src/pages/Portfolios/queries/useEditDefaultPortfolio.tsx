import { useQueryClient, useMutation } from 'react-query';
import { editDefaultPortfolio } from '@api/portfolio';
import { portfolioKeys } from '@lib/index';

interface EditDefaultPortfolioArgs {
	prevPortfolioId: number;
	newPortfolioId: number;
}

export default function useEditDefaultPortfolio() {
	const queryClient = useQueryClient();

	return useMutation(
		({ prevPortfolioId, newPortfolioId }: EditDefaultPortfolioArgs) =>
			editDefaultPortfolio(prevPortfolioId, newPortfolioId),
		{
			onSuccess: res => {
				queryClient.setQueryData<number>(portfolioKeys.defaultId(), () => res);
			}
		}
	);
}
