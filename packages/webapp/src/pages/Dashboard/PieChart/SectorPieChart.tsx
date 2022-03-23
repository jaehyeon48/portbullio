import { useRef, useEffect, useState } from 'react';
import { PieChart as PieChartIcon } from '@components/Icon';
import { useHoldingsTickers, useHoldingsSectors, useThemeMode } from '@hooks/index';
import { SectorInfo, SectorPieChartRatio } from '@types';
import * as Style from '../style';
import { adjustToDpr } from '../utils';
import { drawPieChart } from './utils';
import SelectNumOfItems from '../SelectNumOfItems';

const MAX_NUM_OF_PIES = 7;

export default function SectorPieChart() {
	const [theme] = useThemeMode();
	const pieChartCanvasRef = useRef<HTMLCanvasElement>(null);
	const tickers = useHoldingsTickers();
	const sectors = useHoldingsSectors();
	const sectorMap = initializeSectorMap(sectors);
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
			<Style.PieChartContainer>
				<Style.PieChartCanvas ref={pieChartCanvasRef} />
				<Style.LegendContainer />
			</Style.PieChartContainer>
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
