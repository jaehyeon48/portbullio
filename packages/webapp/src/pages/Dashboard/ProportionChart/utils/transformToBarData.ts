import { CashTransactionLog } from '@prisma/client';
import { calcTotalCashAmount } from '@src/utils';
import { Holding } from '@portbullio/shared/src/types';
import { HoldingsValues, HoldingsRatio } from '@types';

export default function transformToBarData(
	holdingsList: Holding[],
	cashTransactions: CashTransactionLog[]
): HoldingsRatio[] {
	const totalCashAmount = calcTotalCashAmount(cashTransactions);
	const cashInfo: Holding = {
		ticker: '현금',
		avgCost: totalCashAmount,
		buyQuantity: 1,
		sellQuantity: 0
	};

	const holdingsValues = [...holdingsList, cashInfo].map(calcHoldingValues);
	const totalAmount = holdingsValues.reduce(sumAmount, 0) || 1;
	return holdingsValues
		.map(({ ticker, value }) => ({ ticker, value, ratio: (value / totalAmount) * 100 }))
		.sort(sortByRatioDesc);
}

function calcHoldingValues({
	ticker,
	avgCost,
	buyQuantity,
	sellQuantity
}: Holding): HoldingsValues {
	const quantity = buyQuantity - sellQuantity;
	return {
		ticker,
		value: avgCost * quantity + (dummyCurrentPrice.get(ticker) ?? avgCost - avgCost) * quantity
	};
}

function sumAmount(acc: number, { value }: HoldingsValues) {
	return acc + value;
}

function sortByRatioDesc(a: HoldingsRatio, b: HoldingsRatio) {
	return b.ratio - a.ratio;
}

const dummyCurrentPrice = new Map([
	['AAPL', 163.98],
	['AMZN', 3225.01],
	['BA', 192.83],
	['COKE', 513.11],
	['GOOG', 2736.03],
	['MSFT', 300.43],
	['SBUX', 89.6],
	['TSLA', 905.39],
	['V', 219.11]
]);
