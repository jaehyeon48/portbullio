import { useEffect, useState } from 'react';
import { TopStocks } from '@portbullio/shared/src/types';
import { useSocketIo } from '@hooks/index';

export default function useTopStocksData(): TopStocks | undefined {
	const [topStocksData, setTopStocksData] = useState<TopStocks>();
	const socket = useSocketIo();

	useEffect(() => {
		socket.emit('REQ_TOP_STOCKS_DATA');
		socket.on('TOP_STOCKS_DATA', data => setTopStocksData(data));
	}, [socket]);

	return topStocksData;
}
