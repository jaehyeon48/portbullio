import * as Icon from '@components/Icon';
import * as ListPage from '@components/ListPage';
import { PortfolioSelect, usePortfolioSelectId } from '@components/PortfolioSelect';
import { Holding } from '@types';
import { formatNum } from '@utils';
import * as Style from './styles';
import HoldingsList from './HoldingsList';

export default function Holdings() {
	const [selectedPortfolioId, handleSelectedPortfolioId] = usePortfolioSelectId();

	return (
		<>
			<ListPage.UpperSection>
				<ListPage.MainHeader>보유종목</ListPage.MainHeader>
				<ListPage.NumOfItems data-testid="num-of-holdings">{formatNum(24)}개</ListPage.NumOfItems>
				<ListPage.UpperSectionButtonContainer>
					<PortfolioSelect value={selectedPortfolioId} onChange={handleSelectedPortfolioId} />
					<ListPage.SearchFilterButton type="button">
						<Icon.Filter width={20} height={20} />
						필터
					</ListPage.SearchFilterButton>
					<ListPage.AddItemButton type="button" onClick={() => {}}>
						<Icon.Plus width={20} height={20} />새 보유종목 추가
					</ListPage.AddItemButton>
				</ListPage.UpperSectionButtonContainer>
				<ListPage.SearchInputContainer>
					<ListPage.SearchInput placeholder="보유종목 검색..." />
					<Icon.Search width={26} height={26} />
				</ListPage.SearchInputContainer>
			</ListPage.UpperSection>
			<ListPage.LowerSection>
				<ListPage.ListContainer>
					<ListPage.ListHeaderContainer>
						<Style.HoldingTickerSection>티커</Style.HoldingTickerSection>
						<Style.HoldingCurrentPriceSection>현재가</Style.HoldingCurrentPriceSection>
						<Style.HoldingAvgPriceSection>평단가</Style.HoldingAvgPriceSection>
						<Style.HoldingQuantitySection>보유수량</Style.HoldingQuantitySection>
						<Style.HoldingTotalValueSection>평가금액</Style.HoldingTotalValueSection>
						<Style.HoldingDailyGainSection>일일 손익</Style.HoldingDailyGainSection>
						<Style.HoldingTotalGainSection>총 손익</Style.HoldingTotalGainSection>
					</ListPage.ListHeaderContainer>
					<HoldingsList holdingsList={dummyHoldingsList} isLoading={false} />
				</ListPage.ListContainer>
			</ListPage.LowerSection>
		</>
	);
}

const dummyHoldingsList: Holding[] = [
	{ ticker: 'AAPL', avgCost: 123.23, quantity: 12345 },
	{ ticker: 'MSFT', avgCost: 456.12, quantity: 123456 },
	{ ticker: 'GOOG', avgCost: 1234.56, quantity: 1234567 },
	{ ticker: 'AMZN', avgCost: 2345.56, quantity: 1234567 },
	{ ticker: 'TSLA', avgCost: 1113.23, quantity: 12 },
	{ ticker: 'NVDA', avgCost: 111.23, quantity: 1 },
	{ ticker: 'V', avgCost: 111.23, quantity: 123456789 },
	{ ticker: 'JNJ', avgCost: 111.23, quantity: 123456789 },
	{ ticker: 'JPM', avgCost: 111.23, quantity: 123456789 },
	{ ticker: 'BRK-B', avgCost: 111.23, quantity: 123456789 }
];
