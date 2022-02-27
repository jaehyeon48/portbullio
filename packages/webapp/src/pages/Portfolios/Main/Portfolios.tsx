import { SyntheticEvent } from 'react';
import * as Icon from '@components/Icon';
import { useQuery } from 'react-query';
import { getPortfolios, getDefaultPortfolio } from '@api/portfolio';
import { useModal } from '@hooks/Modal';
import * as Style from './styles';
import PortfolioList from './PortfolioList';
import AddPortfolio from '../ModalPage/AddPortfolio';

export default function Portfolios() {
	const { data: portfolios, isLoading } = useQuery('portfolioList', getPortfolios, {
		staleTime: Infinity
	});
	const { data: defaultPortfolioId } = useQuery('defaultPortfolio', getDefaultPortfolio, {
		staleTime: Infinity
	});

	const { openModal } = useModal();

	function openAddPortfolioModal(e: SyntheticEvent) {
		openModal(e, <AddPortfolio />);
	}

	return (
		<>
			<Style.UpperSection>
				<Style.Header>내 포트폴리오</Style.Header>
				<Style.NumOfPortfolios data-testid="num-of-my-portfolios">
					{portfolios?.length ?? 0}개
				</Style.NumOfPortfolios>
				<Style.FilterAndAddButtonContainer>
					<Style.SearchFilterButton type="button">
						<Icon.Filter width={20} height={20} />
						필터
					</Style.SearchFilterButton>
					<Style.AddNewPortfolioButton type="button" onClick={openAddPortfolioModal}>
						<Icon.Plus width={20} height={20} />새 포트폴리오 추가
					</Style.AddNewPortfolioButton>
				</Style.FilterAndAddButtonContainer>
				<Style.SearchInputContainer>
					<Style.SearchPortfolio placeholder="포트폴리오 검색..." />
					<Icon.Search width={26} height={26} />
				</Style.SearchInputContainer>
			</Style.UpperSection>
			<Style.LowerSection>
				<Style.PortfolioListContainer>
					<Style.PortfolioListHeaderContainer>
						<Style.PortfolioNameSection>이름</Style.PortfolioNameSection>
						<Style.PortfolioPrivacySection>공개 여부</Style.PortfolioPrivacySection>
						<Style.PortfolioAssetSection>총 자산</Style.PortfolioAssetSection>
					</Style.PortfolioListHeaderContainer>
					<PortfolioList
						portfolioList={portfolios}
						isLoading={isLoading}
						defaultPortfolioId={defaultPortfolioId}
					/>
				</Style.PortfolioListContainer>
			</Style.LowerSection>
		</>
	);
}