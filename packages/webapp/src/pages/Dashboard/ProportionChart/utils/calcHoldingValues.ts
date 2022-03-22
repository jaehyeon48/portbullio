import { Holding } from '@portbullio/shared/src/types';
import { HoldingsValues } from '@types';

export default function calcHoldingValues({
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
