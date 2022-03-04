/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { workerData, parentPort } = require('worker_threads');

parentPort?.postMessage(main(workerData));

// @ts-ignore
function groupByTicker(stockData) {
	const result = new Map();
	// @ts-ignore
	stockData.forEach(stock => {
		if (!result.has(stock.ticker)) result.set(stock.ticker, []);
		result.get(stock.ticker).push(stock);
	});
	return result;
}

// @ts-ignore
function calculateAvgCostAndQuantity(ticker, stockData) {
	const result = { ticker, avgCost: 0, quantity: 0 };
	let totalCost = 0;
	let totalQuantity = 0;
	let numOfSellTransaction = 0;

	// @ts-ignore
	stockData.forEach(stock => {
		if (stock.transactionType === 'sell') {
			numOfSellTransaction += stock.quantity;
			return;
		}

		const buyQuantity = stock.quantity - numOfSellTransaction;
		if (buyQuantity > 0) {
			totalCost += stock.price * buyQuantity;
			totalQuantity += buyQuantity;
			numOfSellTransaction = 0;
			return;
		}

		if (buyQuantity < 0) {
			numOfSellTransaction = -buyQuantity;
			return;
		}

		numOfSellTransaction = 0;
	});

	result.avgCost = totalQuantity > 0 ? totalCost / totalQuantity : 0;
	result.quantity = totalQuantity > 0 ? totalQuantity : 0;
	return result;
}

// @ts-ignore
function main(stockData) {
	return [...groupByTicker(stockData)].map(([ticker, tickerData]) =>
		calculateAvgCostAndQuantity(ticker, tickerData)
	);
}
