import { useRef, useEffect, SyntheticEvent } from 'react';
import { Holding } from '@portbullio/shared/src/types';
import { HoldingsRatio, BarInfo } from '@types';
import { useHoldingsList, useCashTransactionList, useThemeMode } from '@hooks/index';
import { useSelectPortfolioId, BarChartAsc as BarChartAscIcon } from '@components/index';
import { calcTotalCashAmount, formatCurrency } from '@utils';
import * as Style from '../style';
import { adjustToDpr } from '../utils';
import { NUM_OF_BARS } from './constants';
import {
	drawAxis,
	drawHorizontalGrid,
	drawBars,
	calcBarInfo,
	drawBarTooltip,
	drawBarTooltipText
} from './utils';

interface HoldingsValues {
	ticker: string;
	value: number;
}

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
		barInfos.current.forEach(({ x, y, width, height, value }) => {
			if (offsetX < x || offsetX > x + width || offsetY < y - 10 || offsetY > y + height) return;
			isCursorOnBar = true;
			const text = `총 금액: ${formatCurrency(value, 'usd')}`;
			drawBarTooltip({ ctx, theme, canvasWidth, canvasHeight, x: offsetX, y: offsetY, text });
			drawBarTooltipText({ ctx, theme, canvasWidth, x: offsetX, y: offsetY, text });
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

const dummyCurrentPrice = new Map([
	['AAPL', 163.98],
	['AMZN', 3225.01],
	['BA', 192.83],
	['COKE', 513.11],
	['GOOG', 2736.03],
	['MSFT', 300.43],
	['SBUX', 89.6],
	['TSLA', 905.39],
	['V', 219.11]
]);

function calcHoldingValues({
	ticker,
	avgCost,
	buyQuantity,
	sellQuantity
}: Holding): HoldingsValues {
	const quantity = buyQuantity - sellQuantity;
	return {
		ticker,
		value: avgCost * quantity + (dummyCurrentPrice.get(ticker) ?? avgCost - avgCost) * quantity
	};
}

function calcHoldingRatio(
	holdingsValues: HoldingsValues,
	totalValue: number | undefined
): HoldingsRatio {
	const { ticker, value } = holdingsValues;
	if (!totalValue || totalValue <= 0) return { ticker, ratio: 0, value: 0 };
	return { ticker, ratio: (value / totalValue) * 100, value };
}

function convertToBarChartData(ratios: HoldingsRatio[], numOfBars: number): HoldingsRatio[] {
	if (numOfBars === ratios.length) return ratios;

	const others: HoldingsRatio = {
		ticker: 'others',
		ratio: ratios.slice(numOfBars - 1).reduce((acc, el) => acc + el.ratio, 0),
		value: ratios.slice(numOfBars - 1).reduce((acc, el) => acc + el.value, 0)
	};

	return numOfBars === 1 ? [others] : [...ratios, others].sort((a, b) => b.ratio - a.ratio);
}
