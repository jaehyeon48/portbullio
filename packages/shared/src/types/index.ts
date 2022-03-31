export interface Holding {
	ticker: string;
	avgCost: number;
	buyQuantity: number;
	sellQuantity: number;
}

export interface ServerToClientEvents {}

export interface ClientToServerEvents {
	REGISTER_TICKER: (tickers: string[]) => void;
	UNREGISTER_TICKER: () => void;
}

export interface InterServerEvents {}

export interface SocketData {}
