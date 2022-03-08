import { useQueryClient, useMutation } from 'react-query';
import { PortfolioPrivacy } from '@prisma/client';
import { createPortfolio } from '@api/portfolio';

interface CreatePortfolioArgs {
	name: string;
	privacy: PortfolioPrivacy;
}

export default function useCreatePortfolio() {
	const queryClient = useQueryClient();

	return useMutation(({ name, privacy }: CreatePortfolioArgs) => createPortfolio(name, privacy), {
		onSuccess: () => {
			queryClient.invalidateQueries('portfolioList');
			queryClient.invalidateQueries('defaultPortfolio');
		}
	});
}
