import { useEffect } from 'react';
import { useSelectedPortfolioId } from '@components/index';
import { getHoldingsTickers } from '@utils';
import { useHoldingsList } from '../ReactQuery';
import { useSocketIo } from './useSocketIo';

export default function useRegisterTickers() {
	const socket = useSocketIo();
	const portfolioId = useSelectedPortfolioId();
	const tickers = getHoldingsTickers(useHoldingsList(portfolioId).data ?? []);

	useEffect(() => {
		if (tickers.length === 0) return;
		socket.emit('REGISTER_TICKER', tickers);
	}, [socket, tickers]);

	useEffect(() => {
		document.addEventListener('visibilitychange', evtListener);

		function evtListener() {
			if (document.visibilityState === 'hidden') {
				socket.emit('UNREGISTER_TICKER');
			} else {
				socket.emit('REGISTER_TICKER', tickers);
			}
		}

		return () => {
			document.removeEventListener('visibilitychange', evtListener);
		};
	}, [socket, tickers]);
}
