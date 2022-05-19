import { AssetChartData, Theme } from '@types';
import { formatCurrency } from '@utils';
import yPos from './appliedYPos';
import { assetChartValueLegendFont } from './chartFont';
import { Y_AXIS_LEGEND_GAP, Y_AXIS_MARGIN, ASSET_CHART_LINE_THICKNESS } from '../constants';
import { assetChartLineColor } from '../../colors';
import { crispPixel } from '../../utils';

interface Props {
	ctx: CanvasRenderingContext2D;
	theme: Theme;
	viewWidth: number;
	canvasWidth: number;
	canvasHeight: number;
	minValue: number;
	maxValue: number;
	chartData: AssetChartData[];
	numOfVerticalGrids: number;
}

export default function drawLine({
	ctx,
	theme,
	viewWidth,
	canvasWidth,
	canvasHeight,
	minValue,
	maxValue,
	chartData,
	numOfVerticalGrids
}: Props) {
	ctx.font = assetChartValueLegendFont(viewWidth);

	const maxTextWidth = ctx.measureText(formatCurrency(maxValue, 'usd')).width;
	let xPos = maxTextWidth + Y_AXIS_MARGIN + Y_AXIS_LEGEND_GAP;
	const verticalGridGap =
		(canvasWidth - maxTextWidth - Y_AXIS_MARGIN * 3 - Y_AXIS_LEGEND_GAP) / (numOfVerticalGrids - 1);

	for (let i = chartData.length - 1; i >= 0; i--) {
		if (i > 0) {
			ctx.beginPath();
			ctx.strokeStyle = assetChartLineColor(theme);
			ctx.lineWidth = ASSET_CHART_LINE_THICKNESS;
			ctx.moveTo(
				crispPixel(xPos, ASSET_CHART_LINE_THICKNESS),
				crispPixel(
					yPos({ canvasHeight, value: chartData[i].totalAsset, minValue, maxValue }),
					ASSET_CHART_LINE_THICKNESS
				)
			);
			ctx.lineTo(
				crispPixel(xPos + verticalGridGap, ASSET_CHART_LINE_THICKNESS),
				crispPixel(
					yPos({ canvasHeight, value: chartData[i - 1].totalAsset, minValue, maxValue }),
					ASSET_CHART_LINE_THICKNESS
				)
			);
			ctx.stroke();
		}
		xPos += verticalGridGap;
	}
}
