import { HoldingsValues, HoldingsRatio } from '@types';

export default function calcHoldingRatio(
	holdingsValues: HoldingsValues,
	totalValue: number | undefined
): HoldingsRatio {
	const { ticker, value } = holdingsValues;
	if (!totalValue || totalValue <= 0) return { ticker, ratio: 0, value: 0 };
	return { ticker, ratio: (value / totalValue) * 100, value };
}
