export type StockTransactionType = 'buy' | 'sell';

export interface Holding {
	ticker: string;
	avgCost: number;
	buyQuantity: number;
	sellQuantity: number;
}
