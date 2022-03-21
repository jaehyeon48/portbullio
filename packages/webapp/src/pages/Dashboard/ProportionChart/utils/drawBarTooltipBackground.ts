import { Theme } from '@types';
import { barTooltipBgColor } from '../../colors';
import {
	BAR_TOOLTIP_TEXT_HORIZONTAL_PADDING,
	BAR_TOOLTIP_TEXT_VERTICAL_PADDING
} from '../constants';

interface Props {
	ctx: CanvasRenderingContext2D;
	theme: Theme;
	canvasWidth: number;
	canvasHeight: number;
	x: number;
	y: number;
	text: string;
}

export default function drawBarTooltipBackground({
	ctx,
	theme,
	canvasWidth,
	canvasHeight,
	x,
	y,
	text
}: Props) {
	const textMetrics = ctx.measureText(text);
	const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
	const xPos =
		canvasWidth * 0.66 < x
			? x - textMetrics.width - BAR_TOOLTIP_TEXT_HORIZONTAL_PADDING * 2
			: x + BAR_TOOLTIP_TEXT_HORIZONTAL_PADDING;
	ctx.fillStyle = barTooltipBgColor(theme);
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.fillRect(
		xPos,
		y - BAR_TOOLTIP_TEXT_VERTICAL_PADDING,
		textMetrics.width + BAR_TOOLTIP_TEXT_HORIZONTAL_PADDING * 2,
		textHeight + BAR_TOOLTIP_TEXT_VERTICAL_PADDING * 2
	);
}
