import { useRef, useEffect, useState } from 'react';
import { CashTransactionLog } from '@prisma/client';
import { ClientStockRealtimeData, Holding } from '@portbullio/shared/src/types';
import { BarChartAsc as BarChartAscIcon } from '@components/Icons';
import useThemeMode from '@hooks/Theme';
import { calcTotalCashAmount } from '@utils';
import ProportionChartDetailsPage from './ProportionChartDetails';
import { MAX_NUM_OF_BARS } from './constants';
import * as Style from './styles';
import calcBarGeometry from './utils/calcBarGeometry';
import drawAxis from './utils/drawAxis';
import drawBars from './utils/drawBars';
import drawHorizontalGrid from './utils/drawHorizontalGrid';
import transformToBarData from './utils/transformToBarData';
import truncateToNumOfBars from './utils/truncateToNumOfBars';
import useGetCanvasGeometryOnResize from '../hooks/useGetCanvasGeometryOnResize';
import SelectNumOfItems from '../SelectNumOfItems';
import {
	ItemHeader,
	NoticeEmptyHoldingsList,
	ItemIconContainer,
	ProportionAndSectorChartContainer,
	ProportionAndSectorChartSection
} from '../styles';
import adjustToDpr from '../utils/adjustToDpr';

interface Props {
	holdingsList: Holding[];
	realtimeData: ClientStockRealtimeData;
	cashTransactions: CashTransactionLog[];
	isLoadingData: boolean;
}

export default function ProportionByValue({
	holdingsList,
	realtimeData,
	cashTransactions,
	isLoadingData
}: Props) {
	const [theme] = useThemeMode();
	const barCanvasRef = useRef<HTMLCanvasElement>(null);
	const totalCashAmount = calcTotalCashAmount(cashTransactions);
	const [numOfBars, setNumOfBars] = useState(Math.min(holdingsList.length + 1, MAX_NUM_OF_BARS));
	const originalBarData = transformToBarData(realtimeData, holdingsList, cashTransactions);
	const barData = truncateToNumOfBars(originalBarData, numOfBars);
	const maxRatio = barData.at(0)?.ratio ?? 0;
	const [barCanvasGeometry, setBarCanvasGeometry] = useState({
		width: barCanvasRef.current?.clientWidth,
		height: barCanvasRef.current?.clientHeight
	});
	useGetCanvasGeometryOnResize({ canvasRef: barCanvasRef, setStateFn: setBarCanvasGeometry });

	useEffect(() => {
		if (!barCanvasRef.current) return;
		const barCanvas = barCanvasRef.current;
		const ctx = adjustToDpr(barCanvas.getContext('2d'), barCanvas);
		if (!ctx) return;

		const canvasWidth = barCanvasGeometry.width ?? barCanvas.clientWidth;
		const canvasHeight = barCanvasGeometry.height ?? barCanvas.clientHeight;
		const barGeometries = calcBarGeometry({
			barData,
			maxValue: maxRatio,
			canvasWidth,
			canvasHeight,
			numOfBars
		});

		drawAxis({
			ctx,
			theme,
			maxValue: maxRatio,
			canvasWidth,
			canvasHeight
		});

		drawHorizontalGrid({
			ctx,
			theme,
			maxValue: maxRatio,
			canvasWidth,
			canvasHeight
		});

		drawBars({ ctx, theme, barData: barGeometries, canvasHeight });
	}, [maxRatio, theme, barData, numOfBars, barCanvasGeometry]);

	function isHoldingsEmpty() {
		return holdingsList.length === 0 && totalCashAmount <= 0;
	}

	function renderChartUI() {
		if (isLoadingData) {
			return <NoticeEmptyHoldingsList>?????? ?????? ???...</NoticeEmptyHoldingsList>;
		}

		if (isHoldingsEmpty()) {
			return (
				<NoticeEmptyHoldingsList>
					????????? ????????? ????????????. ?????? ?????? ?????? ?????? ??????????????? ????????? ?????????.
				</NoticeEmptyHoldingsList>
			);
		}

		return <Style.ProportionByValueChartCanvas ref={barCanvasRef} />;
	}

	return (
		<ProportionAndSectorChartSection>
			<ProportionAndSectorChartContainer>
				{!isHoldingsEmpty() && (
					<SelectNumOfItems
						numOfItems={holdingsList.length + 1}
						maxNumOfOptions={MAX_NUM_OF_BARS}
						optionValue={numOfBars}
						setterFn={setNumOfBars}
						labelText="?????? ??????: "
						selectElementId="select-num-of-bar-items"
					/>
				)}
				<ItemIconContainer bgColor="blue">
					<BarChartAscIcon width={20} height={20} />
				</ItemIconContainer>
				<ItemHeader>?????? ??????</ItemHeader>
				<Style.ProportionByValueChartContainer>
					{renderChartUI()}
				</Style.ProportionByValueChartContainer>
			</ProportionAndSectorChartContainer>
			<ProportionChartDetailsPage
				chartData={originalBarData}
				maxRatio={originalBarData.at(0)?.ratio ?? 0}
				numOfBars={numOfBars}
			/>
		</ProportionAndSectorChartSection>
	);
}
