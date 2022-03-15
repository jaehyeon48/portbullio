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
	const result = { ticker, avgCost: 0, buyQuantity: 0, sellQuantity: 0 };
	let totalCost = 0;
	let totalBuyQuantity = 0;
	let totalSellQuantity = 0;
	let numOfSellTransaction = 0;

	// @ts-ignore
	stockData.forEach(stock => {
		if (stock.transactionType === 'sell') {
			numOfSellTransaction += stock.quantity;
			totalSellQuantity += stock.quantity;
			return;
		}

		totalBuyQuantity += stock.quantity;
		const buyQuantity = stock.quantity - numOfSellTransaction;
		if (buyQuantity > 0) {
			totalCost += stock.price * buyQuantity;
			numOfSellTransaction = 0;
			return;
		}

		if (buyQuantity < 0) {
			numOfSellTransaction = -buyQuantity;
			return;
		}

		numOfSellTransaction = 0;
	});

	result.avgCost =
		totalBuyQuantity - totalSellQuantity > 0
			? totalCost / (totalBuyQuantity - totalSellQuantity)
			: 0;
	result.buyQuantity = totalBuyQuantity;
	result.sellQuantity = totalSellQuantity;
	return result;
}

// @ts-ignore
function main(stockData) {
	return [...groupByTicker(stockData)].map(([ticker, tickerData]) =>
		calculateAvgCostAndQuantity(ticker, tickerData)
	);
}
