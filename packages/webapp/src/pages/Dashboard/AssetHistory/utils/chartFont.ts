import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';

export function assetChartValueLegendFont(chartWidth: number) {
	if (chartWidth <= WIDTH_BREAK_POINT_PX.mobileLandScape) return 'bold 10px NotoSansKR';
	if (chartWidth <= WIDTH_BREAK_POINT_PX.tablet) return 'bold 12px NotoSansKR';
	return 'bold 14px NotoSansKR';
}

export function assetChartDateFont(chartWidth: number) {
	if (chartWidth <= WIDTH_BREAK_POINT_PX.mobileLandScape) return '10px NotoSansKR';
	return '12px NotoSansKR';
}
