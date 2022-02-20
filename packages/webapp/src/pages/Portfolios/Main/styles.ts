import styled, { css } from 'styled-components';
import buttonMixin from '@styles/Mixins/buttonMixin';

interface PortfolioListItemProp {
	isFirstList: boolean;
}

const PORTFOLIO_IS_DEFAULT_SECTION_WIDTH = 40;

const sectionStyle = css`
	max-width: 1680px;
	margin: 0 auto;
	padding: 0 40px;
`;

export const UpperSection = styled.section`
	${sectionStyle};
	margin-top: 50px;
`;

export const LowerSection = styled.section`
	${sectionStyle};
	margin-top: 50px;
`;

export const Header = styled.header`
	font-size: 48px;
	font-weight: 700;
`;

export const NumOfPortfolios = styled.p`
	margin: 0;
	color: var(--stockPageTextSubColor);
`;

export const FilterAndAddButtonContainer = styled.div`
	display: flex;
	justify-content: end;
	margin-bottom: 12px;
`;

const filterAndAddButtonStyle = css`
	${buttonMixin};
	display: flex;
	align-items: center;
	color: var(--white);
	padding: 0.25em 0.45em;
	border-radius: 4px;
`;

export const SearchFilterButton = styled.button`
	${filterAndAddButtonStyle};
	background-color: var(--filterButtonBgColor);
	margin-right: 10px;

	& > svg {
		margin: 2px 6px 0 0;
		fill: var(--white);
	}
`;

export const AddNewPortfolioButton = styled.button`
	${filterAndAddButtonStyle};
	background-color: var(--primary);

	& > svg {
		margin-right: 6px;
		stroke: var(--white);
	}
`;

export const SearchInputContainer = styled.div`
	position: relative;
	width: 100%;

	& > svg {
		position: absolute;
		top: 10px;
		left: 7px;
		stroke: var(--gray);
		fill: none;
	}
`;

export const SearchPortfolio = styled.input`
	color: var(--baseTextColor);
	padding: 0.6em 0.5em 0.6em 2.5em;
	background-color: var(--inputBgColor);
	border: var(--baseBorderColor);
	border-radius: 4px;
	outline: none;
	width: 100%;

	&:focus {
		border-color: var(--lightBlue);
		box-shadow: 0 0 5px var(--lightBlue);
		outline: 1px solid var(--lightBlue);

		& + svg {
			stroke: var(--lightBlue);
		}
	}
`;

export const PortfolioListContainer = styled.div`
	width: 100%;
`;

export const PortfolioListHeaderContainer = styled.div`
	display: flex;
	font-size: 18px;
	font-weight: 700;
	color: var(--stockPageTextSubColor);
	border-bottom: 1px solid var(--darkGray);
	padding-bottom: 0.5em;
`;

export const PortfolioIsDefaultSection = styled.div`
	width: ${PORTFOLIO_IS_DEFAULT_SECTION_WIDTH}px;
`;

export const PortfolioNameSection = styled.div`
	width: calc(30% - ${PORTFOLIO_IS_DEFAULT_SECTION_WIDTH}px);
`;

export const PortfolioPrivacySection = styled.div`
	width: 15%;
	display: flex;
	align-items: center;
`;

export const PortfolioAssetSection = styled.div`
	width: 35%;
`;

export const PortfolioActionSection = styled.div`
	width: 20%;
	display: flex;
`;

export const PortfolioListItems = styled.ul`
	position: relative;
	list-style-type: none;
	margin: 0;
	padding: 0;
	max-height: 50vh;
	overflow-y: scroll;

	::-webkit-scrollbar {
		width: 0;
	}
`;

export const PortfolioListItem = styled.li<PortfolioListItemProp>`
	display: flex;
	padding: 1em 0;
	${({ isFirstList }) => !isFirstList && 'border-top: 1px solid var(--baseBorderColor)'};
`;

const portfolioActionButtonStyle = css`
	background: none;
	outline: none;
	border: none;
	display: flex;
	align-items: center;
	cursor: pointer;

	& > svg {
		margin: 2px 2px 0 0;
	}
`;

export const EditNameButton = styled.button`
	${portfolioActionButtonStyle};
	margin-right: 32px;
	color: var(--deepOrange);
`;

export const DeletePortfolioButton = styled.button`
	${portfolioActionButtonStyle};
	color: var(--deepRed);
`;

export const ListNotice = styled.p`
	margin-top: 20px;
	text-align: center;
`;
