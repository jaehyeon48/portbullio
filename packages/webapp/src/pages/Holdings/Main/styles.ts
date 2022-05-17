import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { buttonMixin, priceColorMixin } from '@styles/Mixins';

const priceColorSectionStyle = css`
	${priceColorMixin};
	display: flex;
	align-items: center;
`;

export const HoldingTickerSection = styled.div`
	min-width: 75px;
`;

export const HoldingDetailsSection = styled.div`
	min-width: 170px;
`;

export const HoldingDetailsOpenButton = styled(Link)`
	${buttonMixin};
	color: var(--gray);
	font-size: 14px;
	text-decoration: underline;
`;

export const HoldingCurrentPriceSection = styled.div`
	${priceColorSectionStyle};
	min-width: 230px;
`;

export const HoldingAvgPriceSection = styled.div`
	min-width: 140px;
`;

export const HoldingQuantitySection = styled.div`
	min-width: 125px;
`;

export const HoldingTotalValueSection = styled.div`
	min-width: 190px;
`;

export const HoldingDailyGainSection = styled.div`
	${priceColorSectionStyle};
	min-width: 230px;
`;

export const HoldingTotalGainSection = styled.div`
	${priceColorSectionStyle};
	min-width: 220px;
`;
