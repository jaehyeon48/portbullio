import { useRef, useEffect } from 'react';
import { useHoldingsList, useThemeMode } from '@hooks/index';
import { useSelectPortfolioId, BarChartAsc as BarChartAscIcon } from '@components/index';
import { Holding } from '@portbullio/shared/src/types';
import * as Style from '../style';
import { adjustToDpr } from '../utils';
import { drawAxis, drawHorizontalGrid } from './utils';

interface HoldingsValues {
	ticker: string;
	value: number;
}

interface HoldingsRatio {
	ticker: string;
	ratio: number;
}

export default function ProportionByValue() {
	const [theme] = useThemeMode();
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const portfolioId = useSelectPortfolioId();
	const holdingsList = useHoldingsList(portfolioId);
	const holdingsValues = holdingsList.data?.map(calcHoldingValues);
	const totalValue = holdingsValues?.map(({ value }) => value).reduce((acc, val) => acc + val, 0);
	const holdingsRatio = holdingsValues?.map(holdingsValue =>
		calcHoldingRatio(holdingsValue, totalValue)
	);
	const maxRatio = Math.max(...(holdingsRatio?.map(({ ratio }) => ratio) ?? [0]));

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
	}, [maxRatio, theme]);

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
	return {
		ticker,
		value: (dummyCurrentPrice.get(ticker) ?? avgCost - avgCost) * (buyQuantity - sellQuantity)
	};
}

function calcHoldingRatio(
	holdingsValues: HoldingsValues,
	totalValue: number | undefined
): HoldingsRatio {
	const { ticker, value } = holdingsValues;
	if (!totalValue || totalValue <= 0) return { ticker, ratio: 0 };
	return { ticker, ratio: (value / totalValue) * 100 };
}
