import { useRef, useEffect } from 'react';
import { Holding } from '@portbullio/shared/src/types';
import { HoldingsRatio, BarInfo } from '@types';
import { useHoldingsList, useCashTransactionList, useThemeMode } from '@hooks/index';
import { useSelectPortfolioId, BarChartAsc as BarChartAscIcon } from '@components/index';
import { calcTotalCashAmount } from '@utils';
import * as Style from '../style';
import { adjustToDpr } from '../utils';
import { drawAxis, drawHorizontalGrid, drawBars, calcBarInfo } from './utils';
import { NUM_OF_BARS } from './constants';

interface HoldingsValues {
	ticker: string;
	value: number;
}

export default function ProportionByValue() {
	const [theme] = useThemeMode();
	const canvasRef = useRef<HTMLCanvasElement>(null);
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

	return (
		<Style.ProportionByValueContainer>
			<Style.ItemIconContainer bgColor="blue">
				<BarChartAscIcon width={20} height={20} />
			</Style.ItemIconContainer>
			<Style.ItemHeader>종목 구성</Style.ItemHeader>
			<Style.ProportionByValueChartContainer ref={canvasRef} />
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
