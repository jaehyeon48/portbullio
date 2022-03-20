import { Theme } from '@types';
import { NUM_OF_HORIZONTAL_GRID, Y_AXIS_MARGIN, HORIZONTAL_GRID_THICKNESS } from '../constants';
import { textColor, horizontalGridColor } from '../../colors';
import yPos from './yPos';

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
	ctx.lineWidth = HORIZONTAL_GRID_THICKNESS;
	ctx.font = 'bold 16px NotoSansKR';
	ctx.strokeStyle = horizontalGridColor(theme);
	ctx.textBaseline = 'middle';
	ctx.fillStyle = textColor(theme);
	ctx.fillText('0%', 0, yPos(0, maxValue, canvasHeight));
	ctx.beginPath();
	for (let gridVal = HORIZONTAL_GRID_GAP; gridVal < maxValue; gridVal += HORIZONTAL_GRID_GAP) {
		ctx.moveTo(Y_AXIS_MARGIN, yPos(gridVal, maxValue, canvasHeight));
		ctx.lineTo(canvasWidth, yPos(gridVal, maxValue, canvasHeight));
		ctx.fillText(`${gridVal}%`, 0, yPos(gridVal, maxValue, canvasHeight));
	}
	ctx.stroke();
}
