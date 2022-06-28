import { useState, useRef, useEffect } from 'react';
import getAssetChartData from '@api/user/getAssetChartData';
import { AssetChartData } from '@types';

interface Props {
	portfolioId: number;
	count: number;
	currentWindow: {
		s: number;
		e: number;
	};
}

export default function useChartDataBuffer({ portfolioId, count, currentWindow }: Props) {
	const [chartDataBuffer, setChartDataBuffer] = useState<AssetChartData[]>([]);
	const [isLoadingData, setIsLoadingData] = useState(true);
	const triggerPoint = useRef(0);
	const isReachedEnd = useRef(false);
	const isInitialLoading = useRef(true);

	useEffect(() => {
		triggerPoint.current = 0;
		isReachedEnd.current = false;
		isInitialLoading.current = true;
		setIsLoadingData(true);
		setChartDataBuffer([]);
	}, [portfolioId]);

	useEffect(() => {
		if (!isInitialLoading.current) return;
		if (chartDataBuffer.length > 0) return;

		(async () => {
			const initialChartData = await getAssetChartData({
				portfolioId,
				start: new Date(Date.now() + 1000 * 60 * 60 * 24).toJSON().slice(0, 10),
				count: count * 2
			});
			setChartDataBuffer(initialChartData);

			isInitialLoading.current = false;
			setIsLoadingData(false);
			if (initialChartData.length < count * 2) {
				isReachedEnd.current = true;
			} else {
				isReachedEnd.current = false;
			}
			triggerPoint.current =
				initialChartData.length >= count ? count - 1 : initialChartData.length - 1;
		})();
	}, [portfolioId, count, chartDataBuffer]);

	useEffect(() => {
		if (chartDataBuffer.length === 0) return;
		if (triggerPoint.current === 0) return;
		if (isLoadingData) return;
		if (currentWindow.e <= triggerPoint.current) return;
		if (isReachedEnd.current) return;

		(async () => {
			setIsLoadingData(true);

			const additionalChartData = await getAssetChartData({
				portfolioId,
				start: chartDataBuffer.at(-1)!.createdAt.slice(0, 10),
				count
			});
			setChartDataBuffer(prev => [...prev, ...additionalChartData]);

			setIsLoadingData(false);
			if (additionalChartData.length < count) isReachedEnd.current = true;
			triggerPoint.current += count;
		})();
	}, [chartDataBuffer, currentWindow, portfolioId, count, isLoadingData]);

	return { chartDataBuffer, isReachedEnd, isLoadingData };
}
