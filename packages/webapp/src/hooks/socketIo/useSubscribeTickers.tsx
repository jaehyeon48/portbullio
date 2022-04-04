import { useEffect } from 'react';
import { useSelectedPortfolioId } from '@components/index';
import { getHoldingsTickers } from '@utils';
import { useRealtimeData } from '../realtimeData';
import { useMarketStatus } from '../marketStatus';
import { useHoldingsList } from '../ReactQuery';
import { useSocketIo } from './useSocketIo';

export default function useSubscribeTickers() {
	const realtimeDataStore = useRealtimeData();
	const marketStatus = useMarketStatus();
	const socket = useSocketIo();
	const portfolioId = useSelectedPortfolioId();
	const tickers = getHoldingsTickers(useHoldingsList(portfolioId).data ?? []);
	const cachedTickers = new Set(Object.keys(realtimeDataStore));
	const notCachedTickers = tickers.filter(ticker => !cachedTickers.has(ticker));

	useEffect(() => {
		if (marketStatus === 'loading') return;
		if (tickers.length === 0) return;
		if (notCachedTickers.length === 0) return;
		if (marketStatus === 'opened') socket.emit('SUBSCRIBE_TICKER', tickers);
		else socket.emit('REQ_CACHED_DATA', notCachedTickers);
	}, [socket, notCachedTickers, tickers, marketStatus]);

	useEffect(() => {
		document.addEventListener('visibilitychange', evtListener);

		function evtListener() {
			if (marketStatus !== 'opened') return;
			if (document.visibilityState === 'hidden') {
				socket.emit('UNSUBSCRIBE_TICKER');
			} else {
				socket.emit('SUBSCRIBE_TICKER', tickers);
			}
		}

		return () => {
			document.removeEventListener('visibilitychange', evtListener);
		};
	}, [socket, tickers, marketStatus]);
}
