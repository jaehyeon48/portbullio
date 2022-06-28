import { useState, useRef, useEffect } from 'react';
import getAssetChartData from '@api/user/getAssetChartData';
import { NormalizedAssetChartData } from '../types';
import normalizeData from '../utils/normalizeData';

interface Props {
	portfolioId: number;
	count: number;
	currentWindow: {
		s: number;
		e: number;
	};
}

export default function useChartDataBuffer({ portfolioId, count, currentWindow }: Props) {
	const [chartDataBuffer, setChartDataBuffer] = useState<NormalizedAssetChartData>({});
	const [isLoadingData, setIsLoadingData] = useState(true);
	const triggerPoint = useRef(0);
	const isReachedEnd = useRef(false);
	const isInitialLoading = useRef(true);

	useEffect(() => {
		triggerPoint.current = 0;
		isReachedEnd.current = false;
		isInitialLoading.current = true;
		setIsLoadingData(true);
		setChartDataBuffer({});
	}, [portfolioId]);

	useEffect(() => {
		if (!isInitialLoading.current) return;
		if (Object.keys(chartDataBuffer).length > 0) return;

		(async () => {
			const initialChartData = normalizeData(
				await getAssetChartData({
					portfolioId,
					start: new Date(Date.now() + 1000 * 60 * 60 * 24).toJSON().slice(0, 10),
					count: count * 2
				})
			);
			setChartDataBuffer(initialChartData);

			isInitialLoading.current = false;
			setIsLoadingData(false);
			const initialChartDataLength = Object.keys(initialChartData).length;
			if (initialChartDataLength < count * 2) {
				isReachedEnd.current = true;
			} else {
				isReachedEnd.current = false;
			}
			triggerPoint.current =
				initialChartDataLength >= count ? count - 1 : initialChartDataLength - 1;
		})();
	}, [portfolioId, count, chartDataBuffer]);

	useEffect(() => {
		if (Object.keys(chartDataBuffer).length === 0) return;
		if (triggerPoint.current === 0) return;
		if (isLoadingData) return;
		if (currentWindow.e <= triggerPoint.current) return;
		if (isReachedEnd.current) return;

		(async () => {
			setIsLoadingData(true);

			const additionalChartData = await getAssetChartData({
				portfolioId,
				start: Object.entries(chartDataBuffer).at(-1)![0].slice(0, 10),
				count
			});
			setChartDataBuffer(prev => ({ ...prev, ...normalizeData(additionalChartData) }));

			setIsLoadingData(false);
			const additionalChartDataLength = Object.keys(additionalChartData).length;
			if (additionalChartDataLength < count) isReachedEnd.current = true;
			triggerPoint.current += count;
		})();
	}, [chartDataBuffer, currentWindow, portfolioId, count, isLoadingData]);

	return { chartDataBuffer, isReachedEnd, isLoadingData };
}
