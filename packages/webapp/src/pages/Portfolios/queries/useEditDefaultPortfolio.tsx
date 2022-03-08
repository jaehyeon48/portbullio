import { useQueryClient, useMutation } from 'react-query';
import { editDefaultPortfolio } from '@api/portfolio';

interface CreatePortfolioArgs {
	prevPortfolioId: number;
	newPortfolioId: number;
}

export default function useCreatePortfolio() {
	const queryClient = useQueryClient();

	return useMutation(
		({ prevPortfolioId, newPortfolioId }: CreatePortfolioArgs) =>
			editDefaultPortfolio(prevPortfolioId, newPortfolioId),
		{
			onSuccess: () => queryClient.invalidateQueries('defaultPortfolio')
		}
	);
}
