export interface Holding {
	ticker: string;
	avgCost: number;
	buyQuantity: number;
	sellQuantity: number;
}

export interface ServerToClientEvents {
	REALTIME_DATA: (data: ClientStockRealtimeData) => void;
	CACHED_DATA: (data: ClientStockRealtimeData) => void;
}

export interface ClientToServerEvents {
	SUBSCRIBE_TICKER: (tickers: string[]) => void;
	UNSUBSCRIBE_TICKER: () => void;
	REQ_CACHED_DATA: (tickers: string[]) => void;
}

export interface InterServerEvents {}

export interface SocketData {}

export interface RealtimeDataProperties {
	price: string;
	change: string;
}

export interface RealtimeData extends RealtimeDataProperties {
	ticker: string;
}

export interface ClientStockRealtimeData {
	[key: string]: RealtimeDataProperties;
}

export type MarketStatus = 'opened' | 'closed';
