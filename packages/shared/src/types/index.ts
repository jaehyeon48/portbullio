export interface Holding {
	ticker: string;
	avgCost: number;
	buyQuantity: number;
	sellQuantity: number;
}

export interface ServerToClientEvents {
	REALTIME_DATA: (data: RealtimeData[]) => void;
}

export interface ClientToServerEvents {
	SUBSCRIBE_TICKER: (tickers: string[]) => void;
	UNSUBSCRIBE_TICKER: () => void;
}

export interface InterServerEvents {}

export interface SocketData {}

export interface RealtimeData {
	ticker: string;
	price: string;
	change: string;
}

export type MarketStatus = 'opened' | 'closed';
