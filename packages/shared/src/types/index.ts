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
	TOP_STOCKS_DATA: (data: TopStocks) => void;
}

export interface ClientToServerEvents {
	SUBSCRIBE_TICKER: (tickers: string[]) => void;
	UNSUBSCRIBE_TICKER: () => void;
	REQ_CACHED_DATA: (tickers: string[]) => void;
	REQ_MAJOR_INDICES_DATA: () => void;
	REQ_TOP_STOCKS_DATA: () => void;
}

export interface InterServerEvents {}

export interface SocketData {}

export type IsMarketOpen = boolean;

export interface MajorIndices {
	DJI: RealtimeDataProperties;
	GSPC: RealtimeDataProperties;
	IXIC: RealtimeDataProperties;
}

export interface TopStocks {
	actives: RealtimeData[];
	gainers: RealtimeData[];
	losers: RealtimeData[];
}
