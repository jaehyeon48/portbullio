import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';
import { Theme, AssetChartData } from '@types';
import { formatCurrency } from '@utils';
import yPos from './appliedYPos';
import { assetChartDateFont, assetChartValueLegendFont } from './chartFont';
import {
	VERTICAL_GRID_THICKNESS,
	X_AXIS_LEGEND_GAP,
	Y_AXIS_LEGEND_GAP,
	Y_AXIS_MARGIN
} from '../constants';
import { crispPixel } from '../../utils';
import { textColor, gridColor } from '../../colors';

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

export default function drawVerticalGrid({
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
	const verticalGridGap =
		(canvasWidth - maxTextWidth - Y_AXIS_MARGIN * 3 - Y_AXIS_LEGEND_GAP) / (numOfVerticalGrids - 1);

	ctx.lineWidth = VERTICAL_GRID_THICKNESS;
	ctx.strokeStyle = gridColor(theme);
	ctx.textAlign = 'center';
	ctx.font = assetChartDateFont(canvasWidth);
	ctx.beginPath();

	let gridXPos = maxTextWidth + Y_AXIS_MARGIN + Y_AXIS_LEGEND_GAP;
	for (let i = 0; i < numOfVerticalGrids; i++) {
		ctx.fillStyle = textColor(theme);
		if (limitNumOfVerticalGrid(i, viewWidth)) {
			ctx.moveTo(
				crispPixel(gridXPos, VERTICAL_GRID_THICKNESS),
				crispPixel(
					yPos({ canvasHeight, value: maxValue, minValue, maxValue }),
					VERTICAL_GRID_THICKNESS
				)
			);
			ctx.lineTo(
				crispPixel(gridXPos, VERTICAL_GRID_THICKNESS),
				crispPixel(
					yPos({ canvasHeight, value: minValue, minValue, maxValue }),
					VERTICAL_GRID_THICKNESS
				)
			);

			if (i < chartData.length) {
				ctx.fillText(
					formatChartDateText(chartData.at(-(i + 1))!.createdAt),
					Math.floor(gridXPos),
					yPos({ canvasHeight, value: minValue, minValue, maxValue }) + X_AXIS_LEGEND_GAP
				);
			}
		}

		gridXPos += verticalGridGap;
	}
	ctx.stroke();
}

function formatChartDateText(text: string) {
	return text.slice(2, 10).replace(/-/g, '/');
}

function limitNumOfVerticalGrid(idx: number, viewWidth: number) {
	if (viewWidth > WIDTH_BREAK_POINT_PX.laptop) return true;
	if (viewWidth <= WIDTH_BREAK_POINT_PX.mobileLandScape) return idx % 4 === 1;
	if (viewWidth <= WIDTH_BREAK_POINT_PX.tablet) return idx % 3 === 1;
	return idx % 2 === 1;
}
