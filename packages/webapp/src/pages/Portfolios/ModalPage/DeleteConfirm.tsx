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
}

export default function DeleteConfirm({ closeFunction, portfolioId, portfolioName }: Props) {
	const queryClient = useQueryClient();

	async function handleDeletePortfolio(e: SyntheticEvent) {
		const createRes = await deletePortfolio(portfolioId);
		if (!createRes) {
			toast.error('에러가 발생했습니다. 다시 시도해 주세요', 'light', 'topRight');
			return;
		}
		toast.success(`${portfolioName}을(를) 삭제했습니다.`, 'light', 'topRight');
		queryClient.invalidateQueries('portfolioList');
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