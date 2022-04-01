import axios from 'axios';
import envConfig from '@config';

export default async function fetchRealtimeData(tickers: string[][]) {
	const result = await Promise.all(
		tickers.map(tickerGroup => {
			const tickerParam = tickerGroup.join(',');
			return axios.get(
				`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${tickerParam}&types=quote&token=${envConfig.iexCloudApiKey}`
			);
		})
	);

	return result;
}
