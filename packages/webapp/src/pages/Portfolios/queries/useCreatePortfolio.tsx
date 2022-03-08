import { useQueryClient, useMutation } from 'react-query';
import { Portfolio, PortfolioPrivacy } from '@prisma/client';
import { createPortfolio } from '@api/portfolio';

interface CreatePortfolioArgs {
	name: string;
	privacy: PortfolioPrivacy;
}

export default function useCreatePortfolio() {
	const queryClient = useQueryClient();

	return useMutation(({ name, privacy }: CreatePortfolioArgs) => createPortfolio(name, privacy), {
		onSuccess: res => {
			queryClient.setQueryData<Portfolio[]>('portfolioList', data =>
				data ? [...data, res] : [res]
			);
			queryClient.invalidateQueries('defaultPortfolio');
		}
	});
}
