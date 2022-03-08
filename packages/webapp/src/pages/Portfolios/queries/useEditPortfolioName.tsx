import { useQueryClient, useMutation } from 'react-query';
import { editPortfolioName } from '@api/portfolio';

interface EditPortfolioNameArgs {
	portfolioId: number;
	newName: string;
}

export default function useEditPortfolioName() {
	const queryClient = useQueryClient();

	return useMutation(
		({ portfolioId, newName }: EditPortfolioNameArgs) => editPortfolioName(portfolioId, newName),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('portfolioList');
			}
		}
	);
}
