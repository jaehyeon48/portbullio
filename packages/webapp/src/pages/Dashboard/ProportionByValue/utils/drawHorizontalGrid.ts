import { Theme } from '@types';
import {
	NUM_OF_HORIZONTAL_GRID,
	Y_AXIS_MARGIN,
	Y_AXIS_LEGEND_GAP,
	HORIZONTAL_GRID_THICKNESS
} from '../constants';
import { textColor, horizontalGridColor } from '../../colors';
import yPos from './appliedYPos';

interface Props {
	ctx: CanvasRenderingContext2D;
	theme: Theme;
	maxValue: number;
	canvasWidth: number;
	canvasHeight: number;
}

export default function drawHorizontalGrid({
	ctx,
	theme,
	maxValue,
	canvasWidth,
	canvasHeight
}: Props) {
	const HORIZONTAL_GRID_GAP = Math.round(maxValue / NUM_OF_HORIZONTAL_GRID);
	const legendXPos = Y_AXIS_MARGIN - Y_AXIS_LEGEND_GAP;
	ctx.lineWidth = HORIZONTAL_GRID_THICKNESS;
	ctx.font = 'bold 14px NotoSansKR';
	ctx.strokeStyle = horizontalGridColor(theme);
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'right';
	ctx.fillStyle = textColor(theme);
	ctx.fillText('0%', legendXPos, yPos({ canvasHeight, value: 0, maxValue }));
	ctx.beginPath();
	for (let gridVal = HORIZONTAL_GRID_GAP; gridVal < maxValue; gridVal += HORIZONTAL_GRID_GAP) {
		ctx.moveTo(Y_AXIS_MARGIN, yPos({ canvasHeight, value: gridVal, maxValue }));
		ctx.lineTo(canvasWidth, yPos({ canvasHeight, value: gridVal, maxValue }));
		ctx.fillText(`${gridVal}%`, legendXPos, yPos({ canvasHeight, value: gridVal, maxValue }));
	}
	ctx.stroke();
}
