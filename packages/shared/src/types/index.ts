export interface Holding {
	ticker: string;
	avgCost: number;
	buyQuantity: number;
	sellQuantity: number;
}

export interface RealtimeDataProperties {
	price: number;
	change: number;
	changePercent: number;
}

export interface RealtimeData extends RealtimeDataProperties {
	ticker: string;
}

export interface ClientStockRealtimeData {
	[key: string]: RealtimeDataProperties;
}

export interface ServerToClientEvents {
	REALTIME_DATA: (data: ClientStockRealtimeData) => void;
	CACHED_DATA: (data: ClientStockRealtimeData) => void;
	MAJOR_INDICES_DATA: (data: MajorIndices) => void;
	TOP_ACTIVES_DATA: (data: TopActives) => void;
	TOP_GAINERS_DATA: (data: TopGainers) => void;
	TOP_LOSERS_DATA: (data: TopLosers) => void;
}

export interface ClientToServerEvents {
	SUBSCRIBE_TICKER: (tickers: string[]) => void;
	SUBSCRIBE_MAJOR_INDICES_DATA: () => void;
	SUBSCRIBE_TOP_STOCKS_DATA: (category: TopStockCategory) => void;
	UNSUBSCRIBE_TICKER: () => void;
	UNSUBSCRIBE_MAJOR_INDICES_DATA: () => void;
	UNSUBSCRIBE_TOP_STOCKS_DATA: () => void;
	REQ_CACHED_DATA: (tickers: string[]) => void;
	REQ_MAJOR_INDICES_DATA: () => void;
	REQ_ALL_TOP_STOCKS_DATA: () => void;
	REQ_TOP_ACTIVES_DATA: () => void;
	REQ_TOP_GAINERS_DATA: () => void;
	REQ_TOP_LOSERS_DATA: () => void;
}

export interface InterServerEvents {}

export interface SocketData {}

export type IsMarketOpen = boolean;

export interface MajorIndices {
	DJI: RealtimeDataProperties;
	GSPC: RealtimeDataProperties;
	IXIC: RealtimeDataProperties;
}

export type TopActives = RealtimeData[];
export type TopGainers = RealtimeData[];
export type TopLosers = RealtimeData[];

export interface TopStocks {
	actives: TopActives;
	gainers: TopGainers;
	losers: TopLosers;
}

export type TopStockCategory = 'all' | 'actives' | 'gainers' | 'losers';
