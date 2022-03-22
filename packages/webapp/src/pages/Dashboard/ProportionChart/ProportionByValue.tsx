import { useRef, useEffect, SyntheticEvent } from 'react';
import { Holding } from '@portbullio/shared/src/types';
import { BarInfo } from '@types';
import { useHoldingsList, useCashTransactionList, useThemeMode } from '@hooks/index';
import { useSelectPortfolioId, BarChartAsc as BarChartAscIcon } from '@components/index';
import { calcTotalCashAmount } from '@utils';
import * as Style from '../style';
import { adjustToDpr } from '../utils';
import { NUM_OF_BARS } from './constants';
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

export default function ProportionByValue() {
	const [theme] = useThemeMode();
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const barTooltipCanvasRef = useRef<HTMLCanvasElement>(null);
	const barInfos = useRef<BarInfo[]>([]);
	const portfolioId = useSelectPortfolioId();
	const cashTransactions = useCashTransactionList(portfolioId ?? 0);
	const totalCashAmount = calcTotalCashAmount(cashTransactions.data);
	const holdingsList = useHoldingsList(portfolioId);
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
	const barChartData = convertToBarChartData(holdingsRatio, NUM_OF_BARS);
	const maxRatio = barChartData.at(0)?.ratio ?? 0;

	useEffect(() => {
		if (!canvasRef.current) return;
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		adjustToDpr(ctx, canvas);
		const canvasWidth = canvas.clientWidth;
		const canvasHeight = canvas.clientHeight;

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
			canvasHeight
		});

		drawBars({ ctx, theme, barData: barInfos.current, canvasHeight });
	}, [maxRatio, theme, barChartData]);

	useEffect(() => {
		if (!barTooltipCanvasRef.current) return;
		const canvas = barTooltipCanvasRef.current;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		adjustToDpr(ctx, canvas);
	}, []);

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

	return (
		<Style.ProportionByValueContainer>
			<Style.ItemIconContainer bgColor="blue">
				<BarChartAscIcon width={20} height={20} />
			</Style.ItemIconContainer>
			<Style.ItemHeader>종목 구성</Style.ItemHeader>
			<Style.ProportionByValueChartContainer>
				<Style.ProportionByValueChartCanvas ref={canvasRef} />
				<Style.BarTooltipCanvas ref={barTooltipCanvasRef} onMouseMove={showBarTooltip} />
			</Style.ProportionByValueChartContainer>
		</Style.ProportionByValueContainer>
	);
}