import { useQueryClient, useMutation } from 'react-query';
import { PortfolioPrivacy } from '@portbullio/shared/src/types';
import { editPortfolioPrivacy } from '@api/portfolio';

interface EditPortfolioNameArgs {
	portfolioId: number;
	newPrivacy: PortfolioPrivacy;
}

export default function useEditPortfolioPrivacy() {
	const queryClient = useQueryClient();

	return useMutation(
		({ portfolioId, newPrivacy }: EditPortfolioNameArgs) =>
			editPortfolioPrivacy(portfolioId, newPrivacy),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('portfolioList');
			}
		}
	);
}
