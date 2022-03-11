import { ListQueryErrorBoundary } from '@components/index';
import * as ListPage from '@components/ListPage';
import * as Style from './styles';
import { useStockTransactions } from '../../queries';
import TransactionList from './TransactionList';

interface Props {
	portfolioId: number;
	ticker: string;
}

export default function TransactionListContainer({ portfolioId, ticker }: Props) {
	const transactionList = useStockTransactions(portfolioId ?? 0, ticker);

	return (
		<ListPage.ListContainer>
			<Style.Header>{ticker} 거래 내역</Style.Header>
			<ListPage.ListHeaderContainer>
				<Style.DateSection>날짜</Style.DateSection>
				<Style.TransactionTypeSection>종류</Style.TransactionTypeSection>
				<Style.PriceSection>가격</Style.PriceSection>
				<Style.QuantitySection>수량</Style.QuantitySection>
				<Style.MemoSection />
			</ListPage.ListHeaderContainer>
			<ListQueryErrorBoundary
				errorMessage="에러가 발생했습니다."
				isError={transactionList.isError}
				refetch={transactionList.refetch}
			>
				<TransactionList
					portfolioId={portfolioId}
					ticker={ticker}
					transactionList={transactionList.data}
					isLoading={transactionList.isLoading}
				/>
			</ListQueryErrorBoundary>
		</ListPage.ListContainer>
	);
}
