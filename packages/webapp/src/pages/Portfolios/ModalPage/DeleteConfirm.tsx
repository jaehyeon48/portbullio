import { SyntheticEvent } from 'react';
import { useQueryClient } from 'react-query';
import { CloseModalFn } from '@src/types';
import { deletePortfolio } from '@api/portfolio';
import toast from '@lib/toast';
import * as Style from './styles';

interface Props {
	closeFunction?: CloseModalFn;
	portfolioId: number;
	portfolioName: string;
	isDefaultPortfolio: boolean;
}

export default function DeleteConfirm({
	closeFunction,
	portfolioId,
	portfolioName,
	isDefaultPortfolio
}: Props) {
	const queryClient = useQueryClient();

	async function handleDeletePortfolio(e: SyntheticEvent) {
		const createRes = await deletePortfolio(portfolioId, isDefaultPortfolio);
		if (!createRes) {
			toast.error({ message: '에러가 발생했습니다. 다시 시도해 주세요' });
			return;
		}
		toast.success({ message: `${portfolioName}을(를) 삭제했습니다.` });
		queryClient.invalidateQueries('portfolioList');
		queryClient.invalidateQueries('defaultPortfolio');
		closeFunction!(e, false);
	}

	return (
		<div>
			<Style.Header>포트폴리오 삭제</Style.Header>
			<Style.ConfirmMessage>
				정말로 <strong>{portfolioName}</strong>을(를) 삭제하시겠습니까?
			</Style.ConfirmMessage>
			<Style.ButtonContainer>
				<Style.DeleteCancelButton type="button" onClick={closeFunction}>
					취소
				</Style.DeleteCancelButton>
				<Style.DeletePortfolioButton type="button" onClick={handleDeletePortfolio}>
					삭제
				</Style.DeletePortfolioButton>
			</Style.ButtonContainer>
		</div>
	);
}
