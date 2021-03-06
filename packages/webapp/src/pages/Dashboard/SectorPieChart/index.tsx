import { useRef, useEffect, useState } from 'react';
import { Holding } from '@portbullio/shared/src/types';
import { PieChart as PieChartIcon } from '@components/Icons';
import useThemeMode from '@hooks/Theme';
import { formatNum, getHoldingsTickers } from '@utils';
import SectorChartDetailsPage from './SectorChartDetails';
import useSectors from './queries/useSectors';
import * as Style from './styles';
import calcSectorRatios from './utils/calcSectorRatios';
import convertToSectorChartData from './utils/convertToSectorChartData';
import drawPieChart from './utils/drawPieChart';
import initializeSectorMap from './utils/initializeSectorMap';
import translateSectorToKor from './utils/translateSectorToKor';
import useGetCanvasGeometryOnResize from '../hooks/useGetCanvasGeometryOnResize';
import SelectNumOfItems from '../SelectNumOfItems';
import { sectorPieChartColors } from '../colors';
import {
	ItemHeader,
	ItemIconContainer,
	NoticeEmptyHoldingsList,
	ProportionAndSectorChartContainer,
	ProportionAndSectorChartSection
} from '../styles';
import adjustToDpr from '../utils/adjustToDpr';

const MAX_NUM_OF_PIES = 7;

interface Props {
	holdingsList: Holding[];
}

export default function SectorPieChart({ holdingsList }: Props) {
	const [theme] = useThemeMode();
	const pieChartCanvasRef = useRef<HTMLCanvasElement>(null);
	const tickers = getHoldingsTickers(holdingsList);
	const sectors = useSectors();
	const sectorMap = initializeSectorMap(sectors.data ?? []);
	const [numOfPies, setNumOfPies] = useState(Math.min(sectorMap.size, MAX_NUM_OF_PIES));
	const sectorRatios = calcSectorRatios(sectorMap, tickers.length);
	const sectorChartData = convertToSectorChartData(sectorRatios, numOfPies);
	const [sectorPieChartCanvasGeometry, setSectorPieChartCanvasGeometry] = useState({
		width: pieChartCanvasRef.current?.clientWidth,
		height: pieChartCanvasRef.current?.clientHeight
	});
	useGetCanvasGeometryOnResize({
		canvasRef: pieChartCanvasRef,
		setStateFn: setSectorPieChartCanvasGeometry
	});

	useEffect(() => {
		if (!pieChartCanvasRef.current) return;
		const pieChartCanvas = pieChartCanvasRef.current;
		const ctx = adjustToDpr(pieChartCanvas.getContext('2d'), pieChartCanvas);
		if (!ctx) return;

		adjustToDpr(ctx, pieChartCanvas);
		const canvasWidth = sectorPieChartCanvasGeometry.width ?? pieChartCanvas.clientWidth;
		const canvasHeight = sectorPieChartCanvasGeometry.height ?? pieChartCanvas.clientHeight;
		const [x, y] = [canvasWidth / 2, canvasHeight / 2];
		const radius = Math.min(canvasWidth, canvasHeight) / 2;

		drawPieChart({ ctx, theme, chartData: sectorChartData, x, y, radius });
	}, [theme, sectorChartData, sectorPieChartCanvasGeometry]);

	function isSectorDataEmpty() {
		return sectorMap.size === 0;
	}

	function renderChartUI() {
		if (sectors.isLoading) {
			return <NoticeEmptyHoldingsList height="300px">?????? ?????? ???...</NoticeEmptyHoldingsList>;
		}

		if (isSectorDataEmpty()) {
			return (
				<NoticeEmptyHoldingsList height="300px">
					????????? ????????? ????????????.
					<br />
					?????? ????????? ????????? ?????????.
				</NoticeEmptyHoldingsList>
			);
		}

		return (
			<>
				<Style.PieChartCanvas ref={pieChartCanvasRef} />
				<Style.LegendContainer>
					<Style.LegendList>
						{sectorChartData.map(({ sector, ratio }, idx) => (
							<Style.LegendListItem key={sector}>
								<Style.LegendColorBox backgroundColor={sectorPieChartColors(theme, idx)} />
								<Style.LegendItemText>
									{translateSectorToKor(sector)}&nbsp;&#40;{formatNum(ratio * 100)}%&#41;
								</Style.LegendItemText>
							</Style.LegendListItem>
						))}
					</Style.LegendList>
				</Style.LegendContainer>
			</>
		);
	}

	return (
		<ProportionAndSectorChartSection>
			<ProportionAndSectorChartContainer>
				{!isSectorDataEmpty() && (
					<SelectNumOfItems
						numOfItems={sectorMap.size}
						maxNumOfOptions={MAX_NUM_OF_PIES}
						optionValue={numOfPies}
						setterFn={setNumOfPies}
						labelText="?????? ??????: "
						selectElementId="select-num-of-sector-pie-items"
					/>
				)}
				<ItemIconContainer bgColor="blue">
					<PieChartIcon width={32} height={32} />
				</ItemIconContainer>
				<ItemHeader>?????? ??????</ItemHeader>
				<Style.PieChartContainer>{renderChartUI()}</Style.PieChartContainer>
			</ProportionAndSectorChartContainer>
			<SectorChartDetailsPage
				chartData={sectorRatios}
				maxRatio={sectorRatios.at(0)?.ratio ?? 0}
				numOfPies={numOfPies}
			/>
		</ProportionAndSectorChartSection>
	);
}
