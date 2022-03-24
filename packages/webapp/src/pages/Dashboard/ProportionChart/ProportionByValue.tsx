import { useRef, useEffect, useState, SyntheticEvent } from 'react';
import { Holding } from '@portbullio/shared/src/types';
import { BarInfo } from '@types';
import { useHoldingsList, useCashTransactionList, useThemeMode } from '@hooks/index';
import { useSelectedPortfolioId, BarChartAsc as BarChartAscIcon } from '@components/index';
import { calcTotalCashAmount } from '@utils';
import * as Style from '../style';
import { adjustToDpr } from '../utils';
import { MAX_NUM_OF_BARS } from './constants';
import {
	drawAxis,
	drawHorizontalGrid,
	drawBars,
	calcBarInfo,
	drawBarTooltipBackground,
	drawBarTooltipText,
	calcHoldingValues,
	calcHoldingRatio,
	convertToBarChartData,
	getBarTooltipText
} from './utils';
import SelectNumOfItems from '../SelectNumOfItems';

export default function ProportionByValue() {
	const [theme] = useThemeMode();
	const barCanvasRef = useRef<HTMLCanvasElement>(null);
	const barTooltipCanvasRef = useRef<HTMLCanvasElement>(null);
	const barInfos = useRef<BarInfo[]>([]);
	const portfolioId = useSelectedPortfolioId();
	const cashTransactions = useCashTransactionList(portfolioId);
	const totalCashAmount = calcTotalCashAmount(cashTransactions.data);
	const holdingsList = useHoldingsList(portfolioId);
	const [numOfBars, setNumOfBars] = useState(
		Math.min((holdingsList.data?.length ?? 0) + 1, MAX_NUM_OF_BARS)
	);
	const cashHoldingsValue: Holding = {
		ticker: '현금',
		avgCost: totalCashAmount,
		buyQuantity: 1,
		sellQuantity: 0
	};
	const holdingsValues = [...(holdingsList.data ?? []), cashHoldingsValue].map(calcHoldingValues);
	const totalValue = holdingsValues?.map(({ value }) => value).reduce((acc, val) => acc + val, 0);
	const holdingsRatio =
		holdingsValues
			?.map(holdingsValue => calcHoldingRatio(holdingsValue, totalValue))
			.sort((a, b) => b.ratio - a.ratio) ?? [];
	const barChartData = convertToBarChartData(holdingsRatio, numOfBars);
	const maxRatio = barChartData.at(0)?.ratio ?? 0;

	useEffect(() => {
		if (!barCanvasRef.current) return;
		const barCanvas = barCanvasRef.current;
		const ctx = barCanvas.getContext('2d');
		if (!ctx) return;

		adjustToDpr(ctx, barCanvas);
		const canvasWidth = barCanvas.clientWidth;
		const canvasHeight = barCanvas.clientHeight;

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

		barInfos.current = calcBarInfo({
			barData: barChartData,
			maxValue: maxRatio,
			canvasWidth,
			canvasHeight,
			numOfBars
		});

		drawBars({ ctx, theme, barData: barInfos.current, canvasHeight });
	}, [maxRatio, theme, barChartData, numOfBars]);

	useEffect(() => {
		if (!barTooltipCanvasRef.current) return;
		const barTooltipCanvas = barTooltipCanvasRef.current;
		const ctx = barTooltipCanvas.getContext('2d');
		if (!ctx) return;
		adjustToDpr(ctx, barTooltipCanvas);
	}, [numOfBars]);

	function showBarTooltip(e: SyntheticEvent) {
		if (barInfos.current.length === 0) return;
		if (!barTooltipCanvasRef.current) return;
		const barTooltipCanvas = barTooltipCanvasRef.current;
		const ctx = barTooltipCanvas.getContext('2d');
		if (!ctx) return;

		const canvasWidth = barTooltipCanvas.clientWidth;
		const canvasHeight = barTooltipCanvas.clientHeight;
		const { offsetX, offsetY } = e.nativeEvent as MouseEvent;

		let isCursorOnBar = false;
		barInfos.current.forEach(({ x, y, width, height, value, includedStocks }) => {
			if (offsetX < x || offsetX > x + width || offsetY < y - 10 || offsetY > y + height) return;
			isCursorOnBar = true;
			const text = getBarTooltipText(value, includedStocks);
			drawBarTooltipBackground({
				ctx,
				theme,
				canvasWidth,
				canvasHeight,
				x: offsetX,
				y: offsetY,
				text
			});
			drawBarTooltipText({ ctx, theme, canvasWidth, canvasHeight, x: offsetX, y: offsetY, text });
		});

		if (!isCursorOnBar) {
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		}
	}

	function isHoldingsEmpty() {
		return numOfBars === 1 && totalCashAmount <= 0;
	}

	return (
		<Style.ProportionByValueContainer>
			{!isHoldingsEmpty() && (
				<SelectNumOfItems
					numOfItems={(holdingsList.data?.length ?? 0) + 1}
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
			{isHoldingsEmpty() ? (
				<Style.NoticeEmptyHoldingsList>
					표시할 종목이 없습니다. 보유 종목 혹은 현금 거래내역을 추가해 주세요.
				</Style.NoticeEmptyHoldingsList>
			) : (
				<Style.ProportionByValueChartContainer>
					<Style.ProportionByValueChartCanvas ref={barCanvasRef} />
					<Style.BarTooltipCanvas ref={barTooltipCanvasRef} onMouseMove={showBarTooltip} />
				</Style.ProportionByValueChartContainer>
			)}
		</Style.ProportionByValueContainer>
	);
}
