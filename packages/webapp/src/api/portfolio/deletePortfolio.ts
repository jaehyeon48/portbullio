import axios from 'axios';
import envConfig from '@configs/env';

export default async function deletePortfolio(portfolioId: number, isDefaultPortfolio: boolean) {
	const { serverEndPoint } = envConfig;

	try {
		await axios.delete(
			`${serverEndPoint}/portfolios/${portfolioId}?isDefaultPortfolio=${
				isDefaultPortfolio ? '1' : '0'
			}`,
			{ withCredentials: true }
		);
		return true;
	} catch (error) {
		return false;
	}
}
