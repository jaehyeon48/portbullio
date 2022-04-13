export interface Holding {
	ticker: string;
	avgCost: number;
	buyQuantity: number;
	sellQuantity: number;
}

export interface MajorIndices {
	DJI: Pick<MajorIndexData, 'price' | 'change' | 'changePercent'>;
	GSPC: Pick<MajorIndexData, 'price' | 'change' | 'changePercent'>;
	IXIC: Pick<MajorIndexData, 'price' | 'change' | 'changePercent'>;
}

export interface MajorIndexData {
	ticker: string;
	price: number;
	change: number;
	changePercent: number;
}

export interface ServerToClientEvents {
	REALTIME_DATA: (data: ClientStockRealtimeData) => void;
	CACHED_DATA: (data: ClientStockRealtimeData) => void;
	MAJOR_INDICES_DATA: (data: MajorIndices) => void;
}

export interface ClientToServerEvents {
	SUBSCRIBE_TICKER: (tickers: string[]) => void;
	UNSUBSCRIBE_TICKER: () => void;
	REQ_CACHED_DATA: (tickers: string[]) => void;
	REQ_MAJOR_INDICES_DATA: () => void;
}

export interface InterServerEvents {}

export interface SocketData {}

export interface RealtimeDataProperties {
	price: string;
	change: string;
	changePercent: string;
}

export interface RealtimeData extends RealtimeDataProperties {
	ticker: string;
}

export interface ClientStockRealtimeData {
	[key: string]: RealtimeDataProperties;
}

export type IsMarketOpen = boolean;
