import { Theme } from '@types';
import { AXIS_THICKNESS, Y_AXIS_MARGIN } from '../constants';
import { textColor } from '../../colors';
import yPos from './yPos';

interface Props {
	ctx: CanvasRenderingContext2D;
	theme: Theme;
	maxValue: number;
	canvasWidth: number;
	canvasHeight: number;
}

export default function drawAxis({ ctx, theme, maxValue, canvasWidth, canvasHeight }: Props) {
	ctx.lineWidth = AXIS_THICKNESS;
	ctx.strokeStyle = textColor(theme);
	ctx.beginPath();
	ctx.moveTo(Y_AXIS_MARGIN, 0);
	ctx.lineTo(Y_AXIS_MARGIN, yPos(0, maxValue, canvasHeight));
	ctx.lineTo(canvasWidth, yPos(0, maxValue, canvasHeight));
	ctx.stroke();
}
