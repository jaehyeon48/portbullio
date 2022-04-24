import axios from 'axios';
import { AssetChartData } from '@types';
import envConfig from '@configs/env';

interface GetAssetChartDataParam {
	portfolioId: number;
	start: string;
	count: number;
}

interface GetAssetChartData {
	data: AssetChartData[];
}

export default async function getAssetChartData({
	portfolioId,
	start,
	count
}: GetAssetChartDataParam) {
	const { serverEndPoint } = envConfig;
	try {
		const { data }: GetAssetChartData = await axios.get(
			`${serverEndPoint}/user/asset-chart?pid=${portfolioId}&start=${start}&count=${count}`,
			{
				withCredentials: true
			}
		);

		return data;
	} catch (error) {
		return [];
	}
}
