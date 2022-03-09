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
		onSuccess: res => {
			queryClient.setQueryData<Portfolio[]>(portfolioKeys.all, data =>
				data ? [...data, res] : [res]
			);
			queryClient.invalidateQueries(portfolioKeys.defaultId());
		}
	});
}
