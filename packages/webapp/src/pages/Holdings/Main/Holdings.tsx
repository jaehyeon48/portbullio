import { useQuery } from 'react-query';
import { getAllHoldings } from '@api/portfolio';
import * as Icon from '@components/Icon';
import * as ListPage from '@components/ListPage';
import { PortfolioSelect, usePortfolioSelectId } from '@components/PortfolioSelect';
import { formatNum } from '@utils';
import * as Style from './styles';
import HoldingsList from './HoldingsList';

export default function Holdings() {
	const [selectedPortfolioId, handleSelectedPortfolioId] = usePortfolioSelectId();
	const { data: holdings, isLoading } = useQuery(
		`holdingsOf${selectedPortfolioId}`,
		() => getAllHoldings(selectedPortfolioId),
		{
			staleTime: !selectedPortfolioId ? 0 : Infinity
		}
	);

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
						<Icon.Plus width={20} height={20} />새 거래내역 추가
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
					<HoldingsList holdingsList={holdings} isLoading={isLoading} />
				</ListPage.ListContainer>
			</ListPage.LowerSection>
		</>
	);
}
