import * as Icon from '@components/Icon';
import * as Style from './styles';
import PortfolioList from './PortfolioList';

interface Portfolio {
	id: number;
	isSelected: boolean;
	name: string;
	privacy: 'public' | 'private';
}

export default function Portfolios() {
	return (
		<>
			<Style.UpperSection>
				<Style.Header>내 포트폴리오</Style.Header>
				<Style.NumOfPortfolios>24개</Style.NumOfPortfolios>
				<Style.FilterAndAddButtonContainer>
					<Style.SearchFilterButton type="button">
						<Icon.Filter width={20} height={20} />
						필터
					</Style.SearchFilterButton>
					<Style.AddNewPortfolioButton type="button">
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
						<Style.PortfolioIsSelectedSection />
						<Style.PortfolioNameSection>이름</Style.PortfolioNameSection>
						<Style.PortfolioPrivacySection>공개 여부</Style.PortfolioPrivacySection>
						<Style.PortfolioAssetSection>총 자산</Style.PortfolioAssetSection>
					</Style.PortfolioListHeaderContainer>
					<PortfolioList portfolioList={dummyPortfolios} />
				</Style.PortfolioListContainer>
			</Style.LowerSection>
		</>
	);
}

const dummyPortfolios: Portfolio[] = [
	{
		id: 1,
		isSelected: false,
		name: '포트폴리오 1',
		privacy: 'public'
	},
	{
		id: 2,
		isSelected: false,
		name: '포트폴리오 2',
		privacy: 'private'
	},
	{
		id: 3,
		isSelected: true,
		name: '포트폴리오 3',
		privacy: 'public'
	},
	{
		id: 4,
		isSelected: false,
		name: '포트폴리오 4',
		privacy: 'public'
	},
	{
		id: 5,
		isSelected: false,
		name: '포트폴리오 5',
		privacy: 'public'
	},
	{
		id: 6,
		isSelected: false,
		name: '포트폴리오 6',
		privacy: 'private'
	},
	{
		id: 7,
		isSelected: false,
		name: '포트폴리오 7',
		privacy: 'private'
	},
	{
		id: 8,
		isSelected: false,
		name: '포트폴리오 8',
		privacy: 'public'
	},
	{
		id: 9,
		isSelected: false,
		name: '포트폴리오 9',
		privacy: 'private'
	},
	{
		id: 10,
		isSelected: false,
		name: '포트폴리오 10',
		privacy: 'public'
	}
];
