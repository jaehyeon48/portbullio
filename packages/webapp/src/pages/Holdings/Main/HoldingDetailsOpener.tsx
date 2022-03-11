import { SyntheticEvent } from 'react';
import { useModal } from '@hooks/Modal';
import { useSelectPortfolioId } from '@components/PortfolioSelect';
import TransactionListContainer from '../ModalPage/TransactionList/TransactionListContainer';
import { HoldingDetailsSection, HoldingDetailsOpenButton } from './styles';

interface Props {
	ticker: string;
}

export default function HoldingDetailsOpener({ ticker }: Props) {
	const portfolioId = useSelectPortfolioId();
	const { openModal } = useModal();

	function openTransactionDetailsPage(e: SyntheticEvent) {
		openModal(e, <TransactionListContainer portfolioId={portfolioId ?? 0} ticker={ticker} />);
	}

	return (
		<HoldingDetailsSection>
			<HoldingDetailsOpenButton type="button" onClick={openTransactionDetailsPage}>
				거래내역 자세히 보기
			</HoldingDetailsOpenButton>
		</HoldingDetailsSection>
	);
}
