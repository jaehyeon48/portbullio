import axios from 'axios';
import envConfig from '@configs/env';

export default async function deletePortfolio(portfolioId: number) {
	const { serverEndPoint } = envConfig;

	try {
		await axios.delete(`${serverEndPoint}/portfolio/${portfolioId}`, { withCredentials: true });
		return true;
	} catch (error) {
		return false;
	}
}
