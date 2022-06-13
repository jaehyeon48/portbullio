import { Theme } from '@types';
import yPos from './appliedYPos';
import { textColor, gridColor } from '../../colors';
import {
	NUM_OF_HORIZONTAL_GRID,
	Y_AXIS_MARGIN,
	Y_AXIS_LEGEND_GAP,
	HORIZONTAL_GRID_THICKNESS
} from '../constants';
import crispPixel from '../../utils/crispPixel';

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
	const HORIZONTAL_GRID_GAP = Math.round(maxValue / (NUM_OF_HORIZONTAL_GRID - 1));
	const legendXPos = Y_AXIS_MARGIN - Y_AXIS_LEGEND_GAP;
	ctx.lineWidth = HORIZONTAL_GRID_THICKNESS;
	ctx.font = 'bold 14px NotoSansKR';
	ctx.strokeStyle = gridColor(theme);
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'right';
	ctx.fillStyle = textColor(theme);
	ctx.fillText('0%', Math.floor(legendXPos), yPos({ canvasHeight, value: 0, maxValue }));
	ctx.beginPath();

	let gridVal = HORIZONTAL_GRID_GAP;
	for (let i = 0; i < NUM_OF_HORIZONTAL_GRID; i++) {
		ctx.moveTo(
			crispPixel(Y_AXIS_MARGIN, HORIZONTAL_GRID_THICKNESS),
			crispPixel(yPos({ canvasHeight, value: gridVal, maxValue }), HORIZONTAL_GRID_THICKNESS)
		);
		ctx.lineTo(
			crispPixel(canvasWidth, HORIZONTAL_GRID_THICKNESS),
			crispPixel(yPos({ canvasHeight, value: gridVal, maxValue }), HORIZONTAL_GRID_THICKNESS)
		);
		ctx.fillText(
			`${gridVal}%`,
			Math.floor(legendXPos),
			yPos({ canvasHeight, value: gridVal, maxValue })
		);
		gridVal += HORIZONTAL_GRID_GAP;
	}
	ctx.stroke();
}
