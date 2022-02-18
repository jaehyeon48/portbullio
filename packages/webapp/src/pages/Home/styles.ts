import styled, { css } from 'styled-components';
import Card from '@components/Card';
import { Link } from 'react-router-dom';
import * as Mixin from '@styles/Mixins';
import { breakPoints } from '@constants/index';

interface HeaderContainerProps {
	flexDirection: 'row' | 'column';
}

interface SectionProps extends Mixin.FlexProps {
	margin?: string;
}

const midBotSectionLayout = css`
	width: 30%;
	font-size: 18px;
	max-width: 20em;

	@media screen and (max-width: ${breakPoints.tabletLandscape}) {
		font-size: 16px;
	}
`;

export const Section = styled.section<SectionProps>`
	${Mixin.flexCenter};
	flex-direction: ${({ flexDirection }) => flexDirection};
	align-items: ${({ alignItems }) => alignItems};
	justify-content: ${({ justifyContent }) => justifyContent};
	max-width: 1600px;
	margin: 0 auto;
	margin: ${({ margin }) => margin};
`;

export const HeaderContainer = styled.div<HeaderContainerProps>`
	${Mixin.flexCenter}
	flex-direction: ${({ flexDirection }) => flexDirection};
`;

export const Header = styled.header`
	display: inline-block;
	font-size: 48px;
	font-weight: 700;
	margin-bottom: 1.5em;

	@media screen and (max-width: ${breakPoints.tabletLandscape}) {
		& {
			font-size: 40px;
		}
	}
`;

export const HeaderPrimary = styled.span`
	color: var(--primary);
`;

export const HeroImageContainer = styled.div`
	display: inline-block;
	margin: 1.5em 5em 1.5em 1.5em;

	@media screen and (max-width: ${breakPoints.laptop}) {
		& > svg {
			width: 500px;
			height: 390px;
		}
	}

	@media screen and (max-width: ${breakPoints.tabletLandscape}) {
		& > svg {
			width: 450px;
			height: 351px;
		}
	}
`;

export const Button = styled.button`
	${Mixin.buttonMixin};
	background-color: var(--primary);
	color: var(--white);
	font-size: 1.1em;
	font-weight: 500;
	border-radius: 6px;
	padding: 0.6em 3.2em;
`;

export const LinkButton = styled(Link)`
	${Mixin.buttonMixin};
	text-decoration: none;
	background-color: var(--primary);
	color: var(--white);
	font-size: 1.1em;
	font-weight: 500;
	border-radius: 6px;
	padding: 0.6em 3.2em;
`;

export const IndexContainer = styled(Card)`
	${midBotSectionLayout};
`;

export const IndexHeader = styled.header`
	text-align: center;
	font-size: 1.2em;
	font-weight: 700;
	padding: 0.4em 0;
	border-bottom: 1px solid var(--indexCardHeaderBorderColor);
`;

export const IndexInfo = styled.div`
	${Mixin.priceColorMixin};
`;

export const IndexPriceContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	padding: 0.8em 0 0.5em;
`;

export const IndexPrice = styled.span`
	font-size: 1.5em;
	font-weight: 700;
`;

export const IndexPriceChange = styled.span`
	display: flex;
	align-items: center;
	font-size: 1em;
`;

export const IndexChangePercent = styled.div`
	padding: 0.3em 0 0.6em;
	font-size: 1.1em;
	text-align: center;
`;

export const Top5ListSection = styled.section`
	${midBotSectionLayout};
`;

export const Top5ListHeader = styled(Link)`
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

export const Top5ListItems = styled.ul`
	margin: 0;
	padding: 0;
	list-style-type: none;
`;

export const Top5ListItem = styled(Card)`
	list-style-type: none;
	margin-bottom: 1.2em;
	padding: 0.8em 0;
	cursor: pointer;
`;

export const Top5ListItemLink = styled(Link)`
	text-decoration: none;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

export const Top5ListItemTicker = styled.span`
	width: 20%;
	text-transform: uppercase;
	font-weight: 500;
	color: var(--baseTextColor);
`;

export const Top5ListItemChangePercent = styled.span`
	width: 32%;
	${Mixin.priceColorMixin};
`;

export const Top5ListItemPrice = styled.span`
	width: 22%;
	color: var(--baseTextColor);
	overflow: hidden;
	text-overflow: ellipsis;
`;
