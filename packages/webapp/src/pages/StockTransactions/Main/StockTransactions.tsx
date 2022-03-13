import { useParams } from 'react-router-dom';
import * as ListPage from '@components/ListPage';
import {
	ListQueryErrorBoundary,
	Filter as FilterIcon,
	ArrowBack as ArrowBackIcon,
	useSelectPortfolioId
} from '@components/index';
import { usePortfolioList } from '@hooks/ReactQuery';
import { formatNum } from '@utils';
import * as Style from './styles';
import StockTransactionList from './StockTransactionList';
import { useStockTransactions } from '../queries';

export default function StockTransactions() {
	const { ticker } = useParams() as { ticker: string };
	const portfolioId = useSelectPortfolioId() ?? 0;
	const stockTransactionList = useStockTransactions(portfolioId, ticker);
	const portfolioList = usePortfolioList();

	return (
		<>
			<ListPage.UpperSection>
				<Style.SubHeader>
					{portfolioList.data?.filter(el => el.id === portfolioId)[0]?.name}의
				</Style.SubHeader>
				<ListPage.MainHeader>{ticker} 거래내역</ListPage.MainHeader>
				<ListPage.NumOfItems data-testid="num-of-holdings">
					{formatNum(stockTransactionList.data?.length ?? 0)}개
				</ListPage.NumOfItems>
				<ListPage.UpperSectionButtonContainer>
					<ListPage.SearchFilterButton type="button">
						<FilterIcon width={20} height={20} />
						필터
					</ListPage.SearchFilterButton>
					<Style.BackToHoldingsPageButton to="/holdings">
						<ArrowBackIcon width={16} height={16} />내 종목 페이지로
					</Style.BackToHoldingsPageButton>
				</ListPage.UpperSectionButtonContainer>
			</ListPage.UpperSection>
			<ListPage.LowerSection>
				<ListPage.ListContainer>
					<ListPage.ListHeaderContainer>
						<Style.DateSection>날짜</Style.DateSection>
						<Style.TransactionTypeSection>종류</Style.TransactionTypeSection>
						<Style.PriceSection>가격</Style.PriceSection>
						<Style.QuantitySection>수량</Style.QuantitySection>
						<Style.MemoSection>메모</Style.MemoSection>
						<Style.RealizedProfitAndLossSection>실현손익</Style.RealizedProfitAndLossSection>
						<Style.StockTransactionActionsSection />
					</ListPage.ListHeaderContainer>
					<ListQueryErrorBoundary
						errorMessage="에러가 발생했습니다."
						isError={stockTransactionList.isError}
						refetch={stockTransactionList.refetch}
					>
						<StockTransactionList
							stockTransactionList={stockTransactionList.data}
							isLoading={stockTransactionList.isLoading}
						/>
					</ListQueryErrorBoundary>
				</ListPage.ListContainer>
			</ListPage.LowerSection>
		</>
	);
}
