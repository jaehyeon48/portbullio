import { SyntheticEvent } from 'react';
import { useToast } from 'super-simple-react-toast';
import * as Icon from '@components/Icons';
import ListContainer from '@components/ListPage/ListContainer';
import * as ListPageStyle from '@components/ListPage/styles';
import ListQueryErrorBoundary from '@components/ListQueryErrorBoundary';
import SelectPortfolio from '@components/SelectPortfolio';
import { useSelectedPortfolioId } from '@components/SelectPortfolio/useSelectedPortfolioId';
import { useModal } from '@hooks/Modal';
import useTitle from '@hooks/Title';
import useHoldingsList from '@hooks/ReactQuery/useHoldingsList';
import { formatNum } from '@utils';
import * as Style from './styles';
import HoldingsList from './HoldingsList';
import AddNewStockTransaction from '../ModalPage/AddNewStockTransaction';

export default function Holdings() {
	useTitle('Portbullio - 내 종목');
	const toast = useToast();
	const portfolioId = useSelectedPortfolioId();
	const holdingsList = useHoldingsList(portfolioId);
	const { openModal } = useModal();

	function openAddNewStockTransactionModal(e: SyntheticEvent) {
		if (portfolioId === -1) {
			toast.error({ message: '선택된 포트폴리오가 없습니다.' });
			return;
		}
		openModal(e, <AddNewStockTransaction portfolioId={portfolioId} />);
	}

	return (
		<>
			<ListPageStyle.UpperSection maxWidth="1500px">
				<ListPageStyle.MainHeader>보유종목</ListPageStyle.MainHeader>
				<ListPageStyle.NumOfItems data-testid="num-of-holdings">
					{formatNum(holdingsList.data?.length ?? 0)}개
				</ListPageStyle.NumOfItems>
				<ListPageStyle.UpperSectionButtonContainer>
					<SelectPortfolio />
					<ListPageStyle.UpperSectionButtons>
						<ListPageStyle.SearchFilterButton type="button">
							<Icon.Filter width={20} height={20} />
							필터
						</ListPageStyle.SearchFilterButton>
						<ListPageStyle.AddItemButton type="button" onClick={openAddNewStockTransactionModal}>
							<Icon.Plus width={20} height={20} />새 거래내역 추가
						</ListPageStyle.AddItemButton>
					</ListPageStyle.UpperSectionButtons>
				</ListPageStyle.UpperSectionButtonContainer>
				<ListPageStyle.SearchInputContainer>
					<ListPageStyle.SearchInput placeholder="보유종목 검색..." />
					<Icon.Search width={26} height={26} />
				</ListPageStyle.SearchInputContainer>
			</ListPageStyle.UpperSection>
			<ListPageStyle.LowerSection maxWidth="1500px">
				<ListContainer>
					<ListPageStyle.ListHeaderContainer>
						<Style.HoldingTickerSection>티커</Style.HoldingTickerSection>
						<Style.HoldingDetailsSection />
						<Style.HoldingCurrentPriceSection>현재가</Style.HoldingCurrentPriceSection>
						<Style.HoldingAvgPriceSection>평단가</Style.HoldingAvgPriceSection>
						<Style.HoldingQuantitySection>보유수량</Style.HoldingQuantitySection>
						<Style.HoldingTotalValueSection>평가금액</Style.HoldingTotalValueSection>
						<Style.HoldingDailyGainSection>일일 손익</Style.HoldingDailyGainSection>
						<Style.HoldingTotalGainSection>총 손익</Style.HoldingTotalGainSection>
					</ListPageStyle.ListHeaderContainer>
					<ListQueryErrorBoundary
						errorMessage="에러가 발생했습니다."
						isError={holdingsList.isError}
						refetch={holdingsList.refetch}
					>
						<HoldingsList holdingsList={holdingsList.data} isLoading={holdingsList.isLoading} />
					</ListQueryErrorBoundary>
				</ListContainer>
			</ListPageStyle.LowerSection>
		</>
	);
}
