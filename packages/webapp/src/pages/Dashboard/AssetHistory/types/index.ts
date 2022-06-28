export interface NormalizedAssetChartData {
	[createdAt: string]: {
		totalAsset: number;
		dailyReturn: number;
	};
}

export type ChartBufferData = [
	string,
	{
		totalAsset: number;
		dailyReturn: number;
	}
];
