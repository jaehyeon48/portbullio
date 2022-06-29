import { useState, useRef, useEffect } from 'react';
import getAssetChartData from '@api/user/getAssetChartData';
import usePortfolioList from '@hooks/ReactQuery/usePortfolioList';
import { AssetChartData } from '@types';
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
	const numOfPortfolios = usePortfolioList().data?.length;
	const isCurrentlyFetching = useRef(false);
	const triggerPoint = useRef(0);
	const isReachedEnd = useRef(false);
	const isInitialLoading = useRef(true);
	const lastChartData = useRef<AssetChartData>();

	useEffect(() => {
		triggerPoint.current = 0;
		isReachedEnd.current = false;
		isInitialLoading.current = true;
		lastChartData.current = undefined;
		setIsLoadingData(true);
		setChartDataBuffer({});
	}, [portfolioId]);

	useEffect(() => {
		if (!isInitialLoading.current) return;
		if (lastChartData.current) return;
		if (isCurrentlyFetching.current) return;
		if (numOfPortfolios === undefined || (numOfPortfolios > 0 && portfolioId < 0)) return;

		(async () => {
			isCurrentlyFetching.current = true;
			const initialChartData = await getAssetChartData({
				portfolioId,
				start: new Date(Date.now() + 1000 * 60 * 60 * 24).toJSON().slice(0, 10),
				count: count * 2
			});
			setChartDataBuffer(normalizeData(initialChartData));
			setIsLoadingData(false);
			isInitialLoading.current = false;
			isCurrentlyFetching.current = false;

			lastChartData.current = initialChartData.at(-1);
			const initialChartDataLength = Object.keys(initialChartData).length;
			if (initialChartDataLength < count * 2) {
				isReachedEnd.current = true;
			} else {
				isReachedEnd.current = false;
			}
			triggerPoint.current =
				initialChartDataLength >= count ? count - 1 : initialChartDataLength - 1;
		})();
	}, [portfolioId, count, numOfPortfolios]);

	useEffect(() => {
		if (!lastChartData.current) return;
		if (triggerPoint.current === 0) return;
		if (currentWindow.e <= triggerPoint.current) return;
		if (isReachedEnd.current) return;
		if (isCurrentlyFetching.current) return;

		(async () => {
			setIsLoadingData(true);
			isCurrentlyFetching.current = true;
			const additionalChartData = await getAssetChartData({
				portfolioId,
				start: lastChartData.current!.createdAt.slice(0, 10),
				count
			});
			setChartDataBuffer(prev => ({ ...prev, ...normalizeData(additionalChartData) }));
			setIsLoadingData(false);
			isCurrentlyFetching.current = false;

			lastChartData.current = additionalChartData.at(-1);
			const additionalChartDataLength = Object.keys(additionalChartData).length;
			if (additionalChartDataLength < count) isReachedEnd.current = true;
			triggerPoint.current += count;
		})();
	}, [currentWindow, portfolioId, count]);

	return { chartDataBuffer, isReachedEnd, isLoadingData };
}
