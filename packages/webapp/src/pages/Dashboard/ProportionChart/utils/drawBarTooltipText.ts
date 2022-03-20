import { Theme } from '@types';
import { textColor } from '../../colors';
import { BAR_TOOLTIP_TEXT_HORIZONTAL_PADDING } from '../constants';

interface Props {
	ctx: CanvasRenderingContext2D;
	canvasWidth: number;
	theme: Theme;
	x: number;
	y: number;
	text: string;
}

export default function drawBarTooltipText({ ctx, theme, x, y, canvasWidth, text }: Props) {
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
