import { useQueryClient, useMutation } from 'react-query';
import { Portfolio } from '@prisma/client';
import { editPortfolioName } from '@api/portfolio';
import { updateArray } from '@utils';

interface EditPortfolioNameArgs {
	portfolioId: number;
	newName: string;
}

export default function useEditPortfolioName() {
	const queryClient = useQueryClient();

	return useMutation(
		({ portfolioId, newName }: EditPortfolioNameArgs) => editPortfolioName(portfolioId, newName),
		{
			onSuccess: res => {
				queryClient.setQueryData<Portfolio[]>('portfolioList', data =>
					updateArray(data, res, element => element.id === res.id)
				);
			}
		}
	);
}
