import { RealtimeData } from '@portbullio/shared/src/types';

export default function getRealtimeDataOfTicker(
	realtimeData: RealtimeData[],
	targetTicker: string,
	targetProperty?: keyof RealtimeData
) {
	const result = realtimeData.find(({ ticker }) => ticker === targetTicker);
	if (!result) return null;
	if (!targetProperty) return result;
	return result[targetProperty];
}
