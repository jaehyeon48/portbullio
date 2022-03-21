import { Theme } from '@types';
import { barTooltipBgColor } from '../../colors';
import {
	BAR_TOOLTIP_TEXT_HORIZONTAL_PADDING,
	BAR_TOOLTIP_TEXT_VERTICAL_PADDING,
	BAR_TOOLTIP_TEXT_GAP
} from '../constants';

interface Props {
	ctx: CanvasRenderingContext2D;
	theme: Theme;
	canvasWidth: number;
	canvasHeight: number;
	x: number;
	y: number;
	text: string | string[];
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
	if (typeof text === 'string') {
		drawNormalTextBackground(text, ctx, theme, canvasWidth, canvasHeight, x, y);
	} else {
		drawDetailTextBackground(text, ctx, theme, canvasWidth, canvasHeight, x, y);
	}
}

function drawNormalTextBackground(
	text: string,
	ctx: CanvasRenderingContext2D,
	theme: Theme,
	canvasWidth: number,
	canvasHeight: number,
	x: number,
	y: number
) {
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

function drawDetailTextBackground(
	texts: string[],
	ctx: CanvasRenderingContext2D,
	theme: Theme,
	canvasWidth: number,
	canvasHeight: number,
	x: number,
	y: number
) {
	const bgWidth = Math.max(...texts.map(text => ctx.measureText(text).width));
	const textHeight =
		(Math.max(
			...texts.map(text => {
				const textMetrics = ctx.measureText(text);
				return textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
			})
		) +
			BAR_TOOLTIP_TEXT_GAP) *
		(texts.length - 1);
	const xPos =
		canvasWidth * 0.66 < x
			? x - bgWidth - BAR_TOOLTIP_TEXT_HORIZONTAL_PADDING * 2
			: x + BAR_TOOLTIP_TEXT_HORIZONTAL_PADDING;
	const yPos =
		canvasHeight * 0.8 < y
			? y - BAR_TOOLTIP_TEXT_VERTICAL_PADDING - textHeight
			: y - BAR_TOOLTIP_TEXT_VERTICAL_PADDING - textHeight / 2;

	ctx.fillStyle = barTooltipBgColor(theme);
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.fillRect(
		xPos,
		yPos,
		bgWidth + BAR_TOOLTIP_TEXT_HORIZONTAL_PADDING * 2,
		textHeight + BAR_TOOLTIP_TEXT_VERTICAL_PADDING * 3
	);
}
