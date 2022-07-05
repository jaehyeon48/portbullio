import { SyntheticEvent } from 'react';
import * as Icon from '@components/Icons';
import ListContainer from '@components/ListPage/ListContainer';
import * as ListPageStyle from '@components/ListPage/styles';
import ListQueryErrorBoundary from '@components/ListQueryErrorBoundary';
import { useModal } from '@hooks/Modal';
import usePortfolioList from '@hooks/ReactQuery/usePortfolioList';
import useTitle from '@hooks/Title';
import * as Style from './styles';
import PortfolioList from './PortfolioList';
import AddPortfolio from '../ModalPage/AddPortfolio';

export default function Portfolios() {
	useTitle('Portbullio - 내 포트폴리오');
	const portfolios = usePortfolioList();

	const { openModal } = useModal();

	function openAddPortfolioModal(e: SyntheticEvent) {
		openModal(e, <AddPortfolio />);
	}

	return (
		<>
			<ListPageStyle.UpperSection maxWidth="1440px">
				<ListPageStyle.MainHeader>내 포트폴리오</ListPageStyle.MainHeader>
				<ListPageStyle.NumOfItems data-testid="num-of-my-portfolios">
					{portfolios.data?.length ?? 0}개
				</ListPageStyle.NumOfItems>
				<ListPageStyle.UpperSectionButtonContainer>
					<ListPageStyle.UpperSectionButtons>
						<ListPageStyle.SearchFilterButton type="button">
							<Icon.Filter width={20} height={20} />
							필터
						</ListPageStyle.SearchFilterButton>
						<ListPageStyle.AddItemButton type="button" onClick={openAddPortfolioModal}>
							<Icon.Plus width={20} height={20} />새 포트폴리오 추가
						</ListPageStyle.AddItemButton>
					</ListPageStyle.UpperSectionButtons>
				</ListPageStyle.UpperSectionButtonContainer>
				<ListPageStyle.SearchInputContainer>
					<ListPageStyle.SearchInput placeholder="포트폴리오 검색..." />
					<Icon.Search width={26} height={26} />
				</ListPageStyle.SearchInputContainer>
			</ListPageStyle.UpperSection>
			<ListPageStyle.LowerSection maxWidth="1050px">
				<ListContainer>
					<ListPageStyle.ListHeaderContainer>
						<Style.PortfolioNameSection>이름</Style.PortfolioNameSection>
						<Style.PortfolioPrivacySection>공개 여부</Style.PortfolioPrivacySection>
					</ListPageStyle.ListHeaderContainer>
					<ListQueryErrorBoundary
						errorMessage="에러가 발생했습니다."
						isError={portfolios.isError}
						refetch={portfolios.refetch}
					>
						<PortfolioList portfolioList={portfolios.data} isLoading={portfolios.isLoading} />
					</ListQueryErrorBoundary>
				</ListContainer>
			</ListPageStyle.LowerSection>
		</>
	);
}
