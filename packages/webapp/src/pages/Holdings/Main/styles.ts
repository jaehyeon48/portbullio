import styled from 'styled-components';
import { priceColorMixin } from '@styles/Mixins';

export const HoldingTickerSection = styled.div`
	width: 7%;
	min-width: 120px;
`;

export const HoldingCurrentPriceSection = styled.div`
	display: flex;
	width: 19%;
	min-width: 230px;
	${priceColorMixin};
`;

export const HoldingAvgPriceSection = styled.div`
	width: 12%;
	min-width: 180px;
`;

export const HoldingTotalValueSection = styled.div`
	width: 12%;
	min-width: 180px;
`;

export const HoldingQuantitySection = styled.div`
	width: 12%;
	min-width: 190px;
`;

export const HoldingDailyGainSection = styled.div`
	display: flex;
	${priceColorMixin};
	width: 19%;
	min-width: 245px;
`;

export const HoldingTotalGainSection = styled.div`
	display: flex;
	${priceColorMixin};
	width: 19%;
	min-width: 245px;
`;
