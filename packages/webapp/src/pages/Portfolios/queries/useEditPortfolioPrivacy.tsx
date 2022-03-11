import { useQueryClient, useMutation } from 'react-query';
import { Portfolio, PortfolioPrivacy } from '@prisma/client';
import { editPortfolioPrivacy } from '@api/portfolio';
import { updateArray } from '@utils';
import { portfolioKeys } from '@lib/index';

interface EditPortfolioPrivacyArgs {
	portfolioId: number;
	newPrivacy: PortfolioPrivacy;
}

export default function useEditPortfolioPrivacy() {
	const queryClient = useQueryClient();

	return useMutation(
		({ portfolioId, newPrivacy }: EditPortfolioPrivacyArgs) =>
			editPortfolioPrivacy(portfolioId, newPrivacy),
		{
			onSuccess: updatedPortfolio => {
				queryClient.setQueryData<Portfolio[]>(portfolioKeys.all, portfolios =>
					updateArray(portfolios, updatedPortfolio, element => element.id === updatedPortfolio.id)
				);
			}
		}
	);
}
