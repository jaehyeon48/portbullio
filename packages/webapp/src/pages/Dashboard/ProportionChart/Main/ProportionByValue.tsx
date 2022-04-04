import { useRef, useEffect, useState, SyntheticEvent } from 'react';
import { CashTransactionLog } from '@prisma/client';
import { ClientStockRealtimeData, Holding } from '@portbullio/shared/src/types';
import { useThemeMode, useModal } from '@hooks/index';
import { BarChartAsc as BarChartAscIcon } from '@components/index';
import { calcTotalCashAmount } from '@utils';
import * as Style from '../../styles';
import { adjustToDpr } from '../../utils';
import { MAX_NUM_OF_BARS } from '../constants';
import DetailsPage from '../ModalPage/ProportionChartDetails';
import {
	drawAxis,
	drawHorizontalGrid,
	drawBars,
	calcBarGeometry,
	transformToBarData,
	truncateToNumOfBars
} from '../utils';
import SelectNumOfItems from '../../SelectNumOfItems';

interface Props {
	holdingsList: Holding[];
	realtimeData: ClientStockRealtimeData;
	cashTransactions: CashTransactionLog[];
}

export default function ProportionByValue({ holdingsList, realtimeData, cashTransactions }: Props) {
	const [theme] = useThemeMode();
	const { openModal } = useModal();
	const barCanvasRef = useRef<HTMLCanvasElement>(null);
	const barTooltipCanvasRef = useRef<HTMLCanvasElement>(null);
	const totalCashAmount = calcTotalCashAmount(cashTransactions);
	const [numOfBars, setNumOfBars] = useState(Math.min(holdingsList.length + 1, MAX_NUM_OF_BARS));
	const originalBarData = transformToBarData(realtimeData, holdingsList, cashTransactions);
	const barData = truncateToNumOfBars(originalBarData, numOfBars);
	const maxRatio = barData.at(0)?.ratio ?? 0;

	useEffect(() => {
		if (!barCanvasRef.current) return;
		const barCanvas = barCanvasRef.current;
		const ctx = barCanvas.getContext('2d');
		if (!ctx) return;

		adjustToDpr(ctx, barCanvas);
		const canvasWidth = barCanvas.clientWidth;
		const canvasHeight = barCanvas.clientHeight;
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
	}, [maxRatio, theme, barData, numOfBars]);

	useEffect(() => {
		if (!barTooltipCanvasRef.current) return;
		const barTooltipCanvas = barTooltipCanvasRef.current;
		const ctx = barTooltipCanvas.getContext('2d');
		if (!ctx) return;
		adjustToDpr(ctx, barTooltipCanvas);
	}, [numOfBars]);

	function openDetailsPage(e: SyntheticEvent) {
		openModal(
			e,
			<DetailsPage
				chartData={originalBarData}
				maxRatio={originalBarData.at(0)?.ratio ?? 0}
				numOfBars={numOfBars}
			/>
		);
	}

	function isHoldingsEmpty() {
		return numOfBars === 1 && totalCashAmount <= 0;
	}

	return (
		<Style.ProportionByValueContainer>
			{!isHoldingsEmpty() && (
				<SelectNumOfItems
					numOfItems={holdingsList.length + 1}
					maxNumOfOptions={MAX_NUM_OF_BARS}
					optionValue={numOfBars}
					setterFn={setNumOfBars}
					labelText="종목 개수: "
					selectElementId="select-num-of-bar-items"
				/>
			)}
			<Style.ItemIconContainer bgColor="blue">
				<BarChartAscIcon width={20} height={20} />
			</Style.ItemIconContainer>
			<Style.ItemHeader>종목 구성</Style.ItemHeader>
			{!isHoldingsEmpty() && (
				<Style.OpenDetails type="button" onClick={openDetailsPage}>
					자세히 보기
				</Style.OpenDetails>
			)}
			{isHoldingsEmpty() ? (
				<Style.NoticeEmptyHoldingsList>
					표시할 종목이 없습니다. 보유 종목 혹은 현금 거래내역을 추가해 주세요.
				</Style.NoticeEmptyHoldingsList>
			) : (
				<Style.ProportionByValueChartCanvas ref={barCanvasRef} />
			)}
		</Style.ProportionByValueContainer>
	);
}
