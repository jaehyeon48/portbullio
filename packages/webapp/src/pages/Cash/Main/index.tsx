import { SyntheticEvent } from 'react';
import { useToast } from 'super-simple-react-toast';
import * as Icon from '@components/Icons';
import ListContainer from '@components/ListPage/ListContainer';
import * as ListPageStyle from '@components/ListPage/styles';
import ListQueryErrorBoundary from '@components/ListQueryErrorBoundary';
import SelectPortfolio from '@components/SelectPortfolio';
import { useSelectedPortfolioId } from '@components/SelectPortfolio/useSelectedPortfolioId';
import { useModal } from '@hooks/Modal';
import useCashTransactionList from '@hooks/ReactQuery/useCashTransactionList';
import useTitle from '@hooks/Title';
import { formatCurrency, calcTotalCashAmount } from '@utils';
import CashTransactionList from './CashTransactionList';
import * as Style from './styles';
import AddNewCashTransaction from '../ModalPage/AddNewCashTransaction';

export default function Cash() {
	const toast = useToast();
	useTitle(`Portbullio - 현금 거래내역`);
	const portfolioId = useSelectedPortfolioId();
	const cashTransactions = useCashTransactionList(portfolioId);
	const totalCashAmount = calcTotalCashAmount(cashTransactions.data);

	const { openModal } = useModal();

	function openAddCashTransactionModal(e: SyntheticEvent) {
		if (portfolioId === -1) {
			toast.error({ message: '선택된 포트폴리오가 없습니다.' });
			return;
		}

		openModal(e, <AddNewCashTransaction portfolioId={portfolioId} />);
	}

	return (
		<>
			<ListPageStyle.UpperSection maxWidth="1440px">
				<ListPageStyle.MainHeader>내 현금</ListPageStyle.MainHeader>
				<ListPageStyle.NumOfItems data-testid="num-of-my-cash-transactions">
					{cashTransactions.data?.length ?? 0}개
				</ListPageStyle.NumOfItems>
				<ListPageStyle.UpperSectionButtonContainer>
					<SelectPortfolio />
					<ListPageStyle.SearchFilterButton type="button">
						<Icon.Filter width={20} height={20} />
						필터
					</ListPageStyle.SearchFilterButton>
					<ListPageStyle.AddItemButton type="button" onClick={openAddCashTransactionModal}>
						<Icon.Plus width={20} height={20} />새 현금내역 추가
					</ListPageStyle.AddItemButton>
				</ListPageStyle.UpperSectionButtonContainer>
				<ListPageStyle.SearchInputContainer>
					<ListPageStyle.SearchInput placeholder="현금 거래내역 검색..." />
					<Icon.Search width={26} height={26} />
				</ListPageStyle.SearchInputContainer>
			</ListPageStyle.UpperSection>
			<ListPageStyle.LowerSection maxWidth="950px">
				<Style.TotalCashAmountSection value={totalCashAmount}>
					<span>현금 합계: </span>
					{formatCurrency(totalCashAmount, 'usd')}
				</Style.TotalCashAmountSection>
				<ListContainer>
					<ListPageStyle.ListHeaderContainer>
						<Style.DateSection>날짜</Style.DateSection>
						<Style.CashTypeSection>종류</Style.CashTypeSection>
						<Style.AmountSection>금액</Style.AmountSection>
						<Style.MemoSection>메모</Style.MemoSection>
						<Style.ActionsSection />
					</ListPageStyle.ListHeaderContainer>
					<ListQueryErrorBoundary
						errorMessage="에러가 발생했습니다."
						isError={cashTransactions.isError}
						refetch={cashTransactions.refetch}
					>
						<CashTransactionList
							portfolioId={portfolioId}
							cashList={cashTransactions.data}
							isLoading={cashTransactions.isLoading}
						/>
					</ListQueryErrorBoundary>
				</ListContainer>
			</ListPageStyle.LowerSection>
		</>
	);
}
