import { SyntheticEvent } from 'react';
import * as Icon from '@components/Icon';
import * as ListPage from '@components/ListPage';
import { ListQueryErrorBoundary, PortfolioSelect, useSelectPortfolioId } from '@components/index';
import { useModal } from '@hooks/Modal';
import { formatCurrency, calcTotalCashAmount } from '@utils';
import { useCashTransactionList } from '../queries';
import * as Style from './styles';
import CashTransactionList from './CashTransactionList';
import AddNewCashTransaction from '../ModalPage/AddNewCashTransaction';

export default function Cash() {
	const selectedPortfolioId = useSelectPortfolioId();
	const cashTransactions = useCashTransactionList(selectedPortfolioId ?? 0);
	const totalCashAmount = calcTotalCashAmount(cashTransactions.data);

	const { openModal } = useModal();

	function openAddCashTransactionModal(e: SyntheticEvent) {
		openModal(e, <AddNewCashTransaction portfolioId={selectedPortfolioId ?? 0} />);
	}

	return (
		<>
			<ListPage.UpperSection>
				<ListPage.MainHeader>내 현금</ListPage.MainHeader>
				<ListPage.NumOfItems data-testid="num-of-my-cash-transactions">
					{cashTransactions.data?.length ?? 0}개
				</ListPage.NumOfItems>
				<ListPage.UpperSectionButtonContainer>
					<PortfolioSelect />
					<ListPage.SearchFilterButton type="button">
						<Icon.Filter width={20} height={20} />
						필터
					</ListPage.SearchFilterButton>
					<ListPage.AddItemButton type="button" onClick={openAddCashTransactionModal}>
						<Icon.Plus width={20} height={20} />새 현금내역 추가
					</ListPage.AddItemButton>
				</ListPage.UpperSectionButtonContainer>
				<ListPage.SearchInputContainer>
					<ListPage.SearchInput placeholder="현금 거래내역 검색..." />
					<Icon.Search width={26} height={26} />
				</ListPage.SearchInputContainer>
			</ListPage.UpperSection>
			<ListPage.LowerSection>
				<Style.TotalCashAmountSection value={totalCashAmount}>
					<span>현금 합계: </span>
					{formatCurrency(totalCashAmount, 'usd')}
				</Style.TotalCashAmountSection>
				<ListPage.ListContainer>
					<ListPage.ListHeaderContainer>
						<Style.DateSection>날짜</Style.DateSection>
						<Style.CashTypeSection>종류</Style.CashTypeSection>
						<Style.AmountSection>금액</Style.AmountSection>
						<Style.MemoSection>메모</Style.MemoSection>
						<Style.ActionsSection />
					</ListPage.ListHeaderContainer>
					<ListQueryErrorBoundary
						errorMessage="에러가 발생했습니다."
						isError={cashTransactions.isError}
						refetch={cashTransactions.refetch}
					>
						<CashTransactionList
							portfolioId={selectedPortfolioId ?? 0}
							cashList={cashTransactions.data}
							isLoading={cashTransactions.isLoading}
						/>
					</ListQueryErrorBoundary>
				</ListPage.ListContainer>
			</ListPage.LowerSection>
		</>
	);
}
