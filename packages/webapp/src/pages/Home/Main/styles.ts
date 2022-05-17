import styled, { css } from 'styled-components';
import Card from '@components/Card';
import { Link } from 'react-router-dom';
import * as Mixin from '@styles/Mixins';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';

interface HeaderContainerProps {
	flexDirection: 'row' | 'column';
}

interface SectionProps extends Mixin.FlexProps {
	margin?: string;
}

const midBotSubSectionLayout = css`
	height: 100%;
	width: 30%;
	max-width: 310px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tablet}px) {
		height: 100%;
		width: 70%;
		max-width: 400px;
	}
`;

const sectionStyle = css<SectionProps>`
	display: flex;
	justify-content: space-evenly;
	max-width: 1600px;
`;

export const UpperSection = styled.section`
	${sectionStyle};
	padding: 14px 0 10px;

	@media screen and (max-width: 1024px) {
		align-items: center;
		flex-direction: column;
		gap: 16px;
	}
`;

export const MidSection = styled.section`
	${sectionStyle};
	margin: 50px auto;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tablet}px) {
		flex-direction: column;
		align-items: center;
		gap: 18px;
	}
`;

export const LowerSection = styled.section`
	${sectionStyle};
	margin: 0 auto 5em;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tablet}px) {
		flex-direction: column;
		align-items: center;
		gap: 30px;
		margin: 0 auto;
	}
`;

export const HeaderContainer = styled.div<HeaderContainerProps>`
	${Mixin.flexCenter}
	flex-direction: ${({ flexDirection }) => flexDirection};
`;

export const Header = styled.header`
	display: inline-block;
	font-size: 48px;
	font-weight: 700;
	margin-bottom: 40px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptop}px) {
		font-size: 42px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		font-size: 36px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		margin-bottom: 16px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tablet}px) {
		font-size: 30px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.mobileLandScape}px) {
		font-size: 24px;
	}
`;

export const HeaderPrimary = styled.span`
	color: var(--primary);
`;

export const HeroImageContainer = styled.div`
	display: inline-block;

	& > svg {
		width: 460px;
		height: 359px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		& > svg {
			width: 380px;
			height: 296px;
		}
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tablet}px) {
		& > svg {
			width: 330px;
			height: 257px;
		}
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.mobileLandScape}px) {
		& > svg {
			width: 300px;
			height: 234px;
		}
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.mobile}px) {
		& > svg {
			width: 270px;
			height: 211px;
		}
	}
`;

const homePageButtonStyle = css`
	${Mixin.buttonMixin};
	background-color: var(--primary);
	color: var(--white);
	font-weight: 500;
	border-radius: 6px;
	padding: 8px 42px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptop}px) {
		padding: 8px 40px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tablet}px) {
		font-size: 14px;
	}
`;

export const Button = styled.button`
	${homePageButtonStyle};
`;

export const LinkButton = styled(Link)`
	${homePageButtonStyle};
	text-decoration: none;
`;

export const IndexContainer = styled(Card)`
	${midBotSubSectionLayout};
`;

export const IndexHeader = styled.header`
	text-align: center;
	font-size: 18px;
	font-weight: 700;
	padding: 6px 0;
	border-bottom: 1px solid var(--indexCardHeaderBorderColor);

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		font-size: 16px;
	}
`;

export const IndexInfo = styled.div`
	${Mixin.priceColorMixin};
`;

export const IndexPriceContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	padding: 10px 0 8px;
`;

export const IndexPrice = styled.span`
	font-size: 22px;
	font-weight: 700;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		font-size: 20px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.mobile}px) {
		font-size: 18px;
	}
`;

export const IndexPriceChange = styled.span`
	display: flex;
	align-items: center;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		font-size: 14px;

		& svg {
			width: 12px;
			height: 12px;
		}
	}
`;

export const IndexChangePercent = styled.div`
	padding: 4px 0 6px;
	font-size: 16px;
	text-align: center;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tablet}px) {
		font-size: 14px;
	}
`;

export const TopStocksListSection = styled.section`
	${midBotSubSectionLayout};
`;

export const TopStocksListHeader = styled(Link)`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: 500;
	color: var(--baseTextColor);
	text-decoration: none;
	margin-bottom: 2em;

	& > svg {
		position: absolute;
		right: -11px;
		fill: var(--baseTextColor);
	}
`;

export const TopStocksListItems = styled.ul`
	margin: 0;
	padding: 0;
	list-style-type: none;
`;

export const TopStocksListItem = styled(Card)`
	list-style-type: none;
	margin-bottom: 16px;
	cursor: pointer;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptopSmall}px) {
		font-size: 14px;
	}
`;

export const TopStocksListItemLink = styled(Link)`
	text-decoration: none;
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 0.8em 0;
`;

export const TopStocksListItemTicker = styled.span`
	width: 20%;
	text-transform: uppercase;
	font-weight: 500;
	color: var(--baseTextColor);
`;

export const TopStocksListItemChangePercent = styled.span`
	width: 32%;
	${Mixin.priceColorMixin};
`;

export const TopStocksListItemPrice = styled.span`
	width: 22%;
	color: var(--baseTextColor);
	overflow: hidden;
	text-overflow: ellipsis;
`;
