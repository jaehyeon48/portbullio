import { useQueryClient, useMutation } from 'react-query';
import { Portfolio, PortfolioPrivacy } from '@prisma/client';
import { createPortfolio } from '@api/portfolio';
import { portfolioKeys } from '@lib/index';

interface CreatePortfolioArgs {
	name: string;
	privacy: PortfolioPrivacy;
}

export default function useCreatePortfolio() {
	const queryClient = useQueryClient();

	return useMutation(({ name, privacy }: CreatePortfolioArgs) => createPortfolio(name, privacy), {
		onSuccess: createdPortfolio => {
			queryClient.setQueryData<Portfolio[]>(portfolioKeys.all, prevPortfolios =>
				prevPortfolios ? [...prevPortfolios, createdPortfolio] : [createdPortfolio]
			);
			queryClient.invalidateQueries(portfolioKeys.defaultId());
		}
	});
}
