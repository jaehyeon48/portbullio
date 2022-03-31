import { useEffect } from 'react';
import { useSelectedPortfolioId } from '@components/index';
import { getHoldingsTickers } from '@utils';
import { useHoldingsList } from '../ReactQuery';
import { useSocketIo } from './useSocketIo';

export default function useRegisterTickers() {
	const socketIo = useSocketIo();
	const portfolioId = useSelectedPortfolioId();
	const tickers = getHoldingsTickers(useHoldingsList(portfolioId).data ?? []);
	useEffect(() => {
		if (tickers.length === 0) return;
		socketIo.emit('REGISTER_TICKER', tickers);
	}, [socketIo, tickers]);
}
