import { useQueryClient, useMutation } from 'react-query';
import { Portfolio, PortfolioPrivacy } from '@prisma/client';
import { editPortfolioPrivacy } from '@api/portfolio';
import { updateArray } from '@utils';

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
			onSuccess: res => {
				queryClient.setQueryData<Portfolio[]>('portfolioList', data =>
					updateArray(data, res, element => element.id === res.id)
				);
			}
		}
	);
}
