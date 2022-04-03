import { ClientStockRealtimeData } from '@portbullio/shared/src/types';

export default function getRealtimeDataOfTicker(
	realtimeData: ClientStockRealtimeData[],
	targetTicker: string,
	targetProperty?: keyof ClientStockRealtimeData
) {
	const result = realtimeData.find(({ ticker }) => ticker === targetTicker);
	if (!result) return null;
	if (!targetProperty) return result;
	return result[targetProperty];
}
