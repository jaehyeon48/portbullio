export interface Holding {
	ticker: string;
	avgCost: number;
	buyQuantity: number;
	sellQuantity: number;
}

export interface ServerToClientEvents {
	TICKER_DATA: (data: RealtimeData[]) => void;
}

export interface ClientToServerEvents {
	REGISTER_TICKER: (tickers: string[]) => void;
	UNREGISTER_TICKER: () => void;
}

export interface InterServerEvents {}

export interface SocketData {}

export interface RealtimeData {
	price: string;
	change: string;
}
