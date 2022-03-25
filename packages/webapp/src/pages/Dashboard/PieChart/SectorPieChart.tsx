import { useRef, useEffect, useState } from 'react';
import { PieChart as PieChartIcon } from '@components/Icon';
import { useHoldingsTickers, useThemeMode } from '@hooks/index';
import { SectorInfo, SectorPieChartRatio } from '@types';
import * as Style from '../style';
import { LegendList, LegendListItem, LegendColorBox, LegendItemText } from './PieChartLegendStyles';
import { adjustToDpr } from '../utils';
import { drawPieChart } from './utils';
import { useSectors } from './queries';
import SelectNumOfItems from '../SelectNumOfItems';

import { sectorPieChartColors } from '../colors';

const MAX_NUM_OF_PIES = 7;

export default function SectorPieChart() {
	const [theme] = useThemeMode();
	const pieChartCanvasRef = useRef<HTMLCanvasElement>(null);
	const tickers = useHoldingsTickers();
	const sectors = useSectors();
	const sectorMap = initializeSectorMap(sectors.data ?? []);
	const [numOfPies, setNumOfPies] = useState(Math.min(sectorMap.size, MAX_NUM_OF_PIES));
	const sectorRatios = calcSectorRatios(sectorMap, tickers.length);
	const sectorChartData = convertToSectorChartData(sectorRatios, numOfPies);

	useEffect(() => {
		if (!pieChartCanvasRef.current) return;
		const pieChartCanvas = pieChartCanvasRef.current;
		const ctx = pieChartCanvas.getContext('2d');
		if (!ctx) return;
		adjustToDpr(ctx, pieChartCanvas);
		const { clientWidth: canvasWidth, clientHeight: canvasHeight } = pieChartCanvas;
		const [x, y] = [canvasWidth / 2, canvasHeight / 2];
		const radius = Math.min(canvasWidth, canvasHeight) / 2;

		drawPieChart({ ctx, theme, chartData: sectorChartData, x, y, radius });
	}, [theme, sectorChartData]);

	function isSectorsEmpty() {
		return sectorMap.size === 0;
	}

	return (
		<Style.SectorPieChartContainer>
			{!isSectorsEmpty() && (
				<SelectNumOfItems
					numOfItems={sectorMap.size}
					maxNumOfOptions={MAX_NUM_OF_PIES}
					optionValue={numOfPies}
					setterFn={setNumOfPies}
					labelText="섹터 개수: "
					selectElementId="select-num-of-sector-pie-items"
				/>
			)}
			<Style.ItemIconContainer bgColor="blue">
				<PieChartIcon width={32} height={32} />
			</Style.ItemIconContainer>
			<Style.ItemHeader>섹터 구성</Style.ItemHeader>
			{!isSectorsEmpty() && <Style.OpenDetails>자세히 보기</Style.OpenDetails>}
			{isSectorsEmpty() ? (
				<Style.NoticeEmptyHoldingsList>
					표시할 섹터가 없습니다. 보유 종목을 추가해 주세요.
				</Style.NoticeEmptyHoldingsList>
			) : (
				<Style.PieChartContainer>
					<Style.PieChartCanvas ref={pieChartCanvasRef} />
					<Style.LegendContainer>
						<LegendList>
							{sectorChartData.map(({ sector, ratio }, idx) => (
								<LegendListItem key={sector}>
									<LegendColorBox backgroundColor={sectorPieChartColors(theme, idx)} />
									<LegendItemText>
										{translateSectorToKor(sector)}&nbsp;&#40;{(ratio * 100).toFixed(2)}%&#41;
									</LegendItemText>
								</LegendListItem>
							))}
						</LegendList>
					</Style.LegendContainer>
				</Style.PieChartContainer>
			)}
		</Style.SectorPieChartContainer>
	);
}

function initializeSectorMap(sectors: SectorInfo[]) {
	const result = new Map<string, string[]>(sectors.map(({ sector }) => [sector, []]));
	sectors.forEach(({ sector, ticker }) => result.get(sector)?.push(ticker));
	return result;
}

function calcSectorRatios(
	sectorMap: Map<string, string[]>,
	numOfHoldings: number
): SectorPieChartRatio[] {
	return [...sectorMap]
		.map(([sector, tickers]) => ({
			sector,
			ratio: tickers.length / numOfHoldings,
			includedStocks: [...tickers]
		}))
		.sort((a, b) => b.ratio - a.ratio);
}

function convertToSectorChartData(sectorRatios: SectorPieChartRatio[], numOfItems: number) {
	if (sectorRatios.length === numOfItems) return sectorRatios;

	const others: SectorPieChartRatio = {
		sector: '기타',
		ratio: sectorRatios.slice(numOfItems - 1).reduce((acc, el) => acc + el.ratio, 0),
		includedStocks: sectorRatios
			.slice(numOfItems - 1)
			.map(({ includedStocks }) => [...includedStocks])
			.flat()
	};

	return numOfItems === 1
		? [others]
		: [...sectorRatios.slice(0, numOfItems - 1), others].sort((a, b) => b.ratio - a.ratio);
}

function translateSectorToKor(sector: string) {
	if (sector === 'Basic Materials') return '원자재';
	if (sector === 'Communication Services') return '통신 서비스';
	if (sector === 'Consumer Cyclical') return '임의 소비재';
	if (sector === 'Consumer Defensive') return '필수 소비재';
	if (sector === 'Energy') return '에너지';
	if (sector === 'ETF') return 'ETF';
	if (sector === 'Financial Services') return '금융';
	if (sector === 'Healthcare') return '헬스케어';
	if (sector === 'Industrials') return '산업재';
	if (sector === 'Real Estate') return '부동산';
	if (sector === 'Technology') return '기술';
	if (sector === 'Utilities') return '유틸리티';
	return '기타';
}
