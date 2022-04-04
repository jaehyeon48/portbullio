export interface RealtimeDataFilterOptions {
	avgTotalVolume: number;
	calculationPrice: string;
	change: number;
	changePercent: number;
	close: number | null;
	closeSource: string;
	closeTime: number | null;
	companyName: string;
	currency: string;
	delayedPrice: number | null;
	delayedPriceTime: number | null;
	extendedChange: number | null;
	extendedChangePercent: number | null;
	extendedPrice: number | null;
	extendedPriceTime: number | null;
	high: number | null;
	highSource: string | null;
	highTime: number | null;
	iexAskPrice: number | null;
	iexAskSize: number | null;
	iexBidPrice: number | null;
	iexBidSize: number | null;
	iexClose: number;
	iexCloseTime: number;
	iexLastUpdated: number | null;
	iexMarketPercent: number | null;
	iexOpen: number | null;
	iexOpenTime: number | null;
	iexRealtimePrice: number | null;
	iexRealtimeSize: number | null;
	iexVolume: number | null;
	lastTradeTime: number;
	latestPrice: number;
	latestSource: string;
	latestTime: string;
	latestUpdate: number;
	latestVolume: number;
	low: number | null;
	lowSource: string | null;
	lowTime: number | null;
	marketCap: number;
	oddLotDelayedPrice: number;
	oddLotDelayedPriceTime: number;
	open: number | null;
	openTime: number | null;
	openSource: string;
	peRatio: number;
	previousClose: number;
	previousVolume: number;
	primaryExchange: string;
	symbol: string;
	volume: number;
	week52High: number;
	week52Low: number;
	ytdChange: number;
}

export interface RealtimeDataPerTicker<T> {
	[key: string]: {
		quote: T;
	};
}

export interface StockDataFromIEX {
	symbol: string;
	change: number;
	changePercent: number;
	latestPrice: number;
	iexRealtimePrice: number | null;
}
