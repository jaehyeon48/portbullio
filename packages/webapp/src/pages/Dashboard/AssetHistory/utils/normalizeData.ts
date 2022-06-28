import { AssetChartData } from '@types';
import { NormalizedAssetChartData } from '../types';

export default function normalizeData(assetChartData: AssetChartData[]) {
	const result: NormalizedAssetChartData = {};
	assetChartData.forEach(({ totalAsset, dailyReturn, createdAt }) => {
		result[createdAt] = { totalAsset, dailyReturn };
	});
	return result;
}
