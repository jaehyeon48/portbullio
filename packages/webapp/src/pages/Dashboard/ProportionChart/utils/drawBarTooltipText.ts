import { Theme } from '@types';
import { textColor } from '../../colors';
import { BAR_TOOLTIP_TEXT_HORIZONTAL_PADDING, BAR_TOOLTIP_TEXT_GAP } from '../constants';

interface Props {
	ctx: CanvasRenderingContext2D;
	theme: Theme;
	canvasWidth: number;
	canvasHeight: number;
	x: number;
	y: number;
	text: string | string[];
}

export default function drawBarTooltipText({
	ctx,
	theme,
	x,
	y,
	canvasWidth,
	canvasHeight,
	text
}: Props) {
	if (typeof text === 'string') {
		drawNormalText(text, ctx, theme, canvasWidth, x, y);
	} else {
		drawDetailText(text, ctx, theme, canvasWidth, canvasHeight, x, y);
	}
}

function drawNormalText(
	text: string,
	ctx: CanvasRenderingContext2D,
	theme: Theme,
	canvasWidth: number,
	x: number,
	y: number
) {
	const textMetrics = ctx.measureText(text);
	const xPos =
		canvasWidth * 0.66 < x
			? x - textMetrics.width - BAR_TOOLTIP_TEXT_HORIZONTAL_PADDING
			: x + BAR_TOOLTIP_TEXT_HORIZONTAL_PADDING * 2;
	ctx.textBaseline = 'top';
	ctx.font = '16px NotoSansKR';
	ctx.fillStyle = textColor(theme);
	ctx.fillText(text, xPos, y);
}

function drawDetailText(
	texts: string[],
	ctx: CanvasRenderingContext2D,
	theme: Theme,
	canvasWidth: number,
	canvasHeight: number,
	x: number,
	y: number
) {
	const totalTextHeight =
		(Math.max(
			...texts.map(text => {
				const textMetrics = ctx.measureText(text);
				return textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
			})
		) +
			BAR_TOOLTIP_TEXT_GAP) *
		(texts.length - 1);
	const startYPos = canvasHeight * 0.8 < y ? y - totalTextHeight : y - totalTextHeight / 2;

	texts.reduce((yPos, text) => {
		const textMetrics = ctx.measureText(text);
		const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
		const xPos =
			canvasWidth * 0.66 < x
				? x - textMetrics.width - BAR_TOOLTIP_TEXT_HORIZONTAL_PADDING
				: x + BAR_TOOLTIP_TEXT_HORIZONTAL_PADDING * 2;

		ctx.textBaseline = 'top';
		ctx.font = '16px NotoSansKR';
		ctx.fillStyle = textColor(theme);
		ctx.fillText(text, xPos, yPos);
		return yPos + textHeight + BAR_TOOLTIP_TEXT_GAP;
	}, startYPos);
}
