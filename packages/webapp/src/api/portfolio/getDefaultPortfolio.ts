import axios from 'axios';
import envConfig from '@configs/env';

interface GetDefaultPortfolioRes {
	data: {
		defaultPortfolioId: number;
	};
}

export default async function getDefaultPortfolio(): Promise<number | undefined> {
	const { serverEndPoint } = envConfig;

	try {
		const { data }: GetDefaultPortfolioRes = await axios.get(
			`${serverEndPoint}/portfolio/default`,
			{
				withCredentials: true
			}
		);

		return data.defaultPortfolioId;
	} catch (error) {
		return undefined;
	}
}
