import { HoldingsRatio } from '@types';

export default function convertToBarChartData(
	ratios: HoldingsRatio[],
	numOfBars: number
): HoldingsRatio[] {
	if (numOfBars === ratios.length) return ratios;

	const others: HoldingsRatio = {
		ticker: '기타',
		ratio: ratios.slice(numOfBars - 1).reduce((acc, el) => acc + el.ratio, 0),
		value: ratios.slice(numOfBars - 1).reduce((acc, el) => acc + el.value, 0),
		includedStocks: ratios.slice(numOfBars - 1).map(({ ticker, value }) => [ticker, value])
	};

	return numOfBars === 1 ? [others] : [...ratios, others].sort((a, b) => b.ratio - a.ratio);
}
