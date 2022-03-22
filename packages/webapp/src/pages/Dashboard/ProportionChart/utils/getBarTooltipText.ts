import { formatCurrency } from '@utils';
import { NUM_OF_BAR_TOOLTIP_TEXT_LIMIT } from '../constants';

export default function getBarTooltipText(
	value: number,
	includedStocks: [string, number][] | undefined
) {
	if (!includedStocks) return `총 금액: ${formatCurrency(value, 'usd')}`;
	if (includedStocks.length > NUM_OF_BAR_TOOLTIP_TEXT_LIMIT) {
		return [['총 금액', value], ...includedStocks]
			.slice(0, NUM_OF_BAR_TOOLTIP_TEXT_LIMIT + 1)
			.map(([ticker, val]) => `${ticker}: ${formatCurrency(val, 'usd')}`)
			.concat('(생략)');
	}
	return [['총 금액', value], ...includedStocks].map(
		([ticker, val]) => `${ticker}: ${formatCurrency(val, 'usd')}`
	);
}
